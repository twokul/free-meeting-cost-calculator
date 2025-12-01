"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Clock, Calendar } from "lucide-react";
import { Meeting } from "@/lib/metrics";

function formatMeetingDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatDuration(hours: number): string {
  if (hours >= 1) {
    const roundedHours = Math.round(hours);
    return `${roundedHours} hour${roundedHours !== 1 ? "s" : ""}`;
  }
  const minutes = Math.round(hours * 60);
  return `${minutes} minutes`;
}

interface BudgetBurnersListProps {
  meetings: Meeting[];
  currencySymbol: string;
}

export function BudgetBurnersList({
  meetings,
  currencySymbol,
}: BudgetBurnersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Top 5 Most Expensive Meetings
        </CardTitle>
        <CardDescription>
          The costliest meetings on your calendar. Consider reducing frequency
          or attendees.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meetings.map((meeting, i) => (
            <div
              key={meeting.id + i}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <p className="font-medium truncate">{meeting.title}</p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />{" "}
                    {formatMeetingDate(new Date(meeting.startTime))}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {meeting.attendees}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />{" "}
                    {formatDuration(meeting.durationInHours)}
                  </span>
                  {meeting.isRecurring && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px]">
                      Recurring
                    </span>
                  )}
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="font-bold text-base md:text-lg">
                  {currencySymbol}
                  {Math.round(meeting.cost).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">per session</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
