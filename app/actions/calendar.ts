"use server";

import { google } from "googleapis";
import { cookies } from "next/headers";
import { oauth2Client } from "@/lib/auth";
import { Meeting } from "@/lib/metrics";

export async function fetchMeetingData(
  days: number = 30,
  hourlyRate: number = 100,
): Promise<{ meetings: Meeting[]; error?: string }> {
  const cookieStore = await cookies();
  const tokensStr = cookieStore.get("google_tokens")?.value;

  if (!tokensStr) {
    return { meetings: [], error: "Not authenticated" };
  }

  const tokens = JSON.parse(tokensStr);
  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const now = new Date();
  const timeMin = new Date(
    now.getTime() - days * 24 * 60 * 60 * 1000,
  ).toISOString();
  const timeMax = now.toISOString();

  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 2500, // Reasonable limit
    });

    const events = response.data.items || [];

    const meetings: Meeting[] = events
      .filter((event) => {
        // Filter out declined events (if possible, though list usually returns what's on cal)
        // Filter out "transparent" events (usually available time blocks)? No, meetings can be transparent.
        // Filter out events with no attendees (solo work blocks)
        // Filter out all-day events (often OOO or reminders)
        if (!event.start?.dateTime || !event.end?.dateTime) return false; // All day events usually use 'date' instead of 'dateTime'

        const attendees =
          event.attendees?.filter(
            (a) => !a.resource && a.responseStatus !== "declined",
          ) || [];
        // We assume a meeting needs at least 2 people (including self if not explicitly listed, but API usually lists self).
        // Actually, if I create a meeting, I am an attendee.
        // Let's say strict meeting: > 1 attendee.
        // But sometimes 1-on-1s might just look like 2 attendees.
        // Solo blocks: usually just the user.
        // If attendees list is empty, it's just the user.

        return attendees.length > 1;
      })
      .map((event) => {
        const start = new Date(event.start!.dateTime!);
        const end = new Date(event.end!.dateTime!);
        const durationInHours =
          (end.getTime() - start.getTime()) / (1000 * 60 * 60);

        // Filter out self from attendees count if needed, but usually we want cost of ALL people.
        const attendeesCount =
          event.attendees?.filter(
            (a) => !a.resource && a.responseStatus !== "declined",
          ).length || 1;

        return {
          id: event.id!,
          title: event.summary || "Untitled Meeting",
          startTime: start,
          endTime: end,
          durationInHours,
          attendees: attendeesCount,
          isRecurring: !!event.recurringEventId,
          cost: durationInHours * attendeesCount * hourlyRate,
        };
      });

    return { meetings };
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return { meetings: [], error: "Failed to fetch calendar data" };
  }
}
