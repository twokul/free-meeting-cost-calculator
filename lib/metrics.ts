/**
 * Meeting Cost Calculator - Core Metrics Module
 *
 * This module contains all calculation logic for meeting costs, efficiency scores,
 * and related metrics. The formulas are based on research in organizational psychology
 * and meeting science.
 *
 * @module metrics
 */

import {
  PAY_FOR_X_ITEMS,
  ItemCategory,
  BLENDED_HOURLY_RATE,
} from "./constants";

/**
 * A "Pay For X" item with a calculated quantity based on total meeting cost.
 */
export type PayForXItem = (typeof PAY_FOR_X_ITEMS)[number] & {
  quantity: number;
};

/**
 * Represents a calendar meeting with associated metadata and calculated cost.
 */
export interface Meeting {
  /** Unique identifier for the meeting */
  id: string;
  /** Meeting title/subject */
  title: string;
  /** Meeting start time */
  startTime: Date;
  /** Meeting end time */
  endTime: Date;
  /** Duration in decimal hours (e.g., 1.5 = 1 hour 30 minutes) */
  durationInHours: number;
  /** Number of people attending */
  attendees: number;
  /** Whether this meeting repeats on a schedule */
  isRecurring: boolean;
  /** Calculated cost in currency units */
  cost: number;
}

/**
 * Calculates the total cost of a meeting based on attendee time.
 *
 * **Formula:** `duration × (yourRate + (otherAttendees × blendedRate))`
 *
 * Uses your hourly rate for yourself, and a blended average rate ($150/hr)
 * for other attendees. This is more realistic than assuming everyone earns
 * the same rate—a director's meeting still has mostly IC attendees.
 *
 * @param durationInHours - Meeting duration in decimal hours
 * @param attendees - Number of people in the meeting (including you)
 * @param hourlyRate - Your hourly rate
 * @returns Total meeting cost in currency units
 *
 * @example
 * // 1-hour meeting, 5 attendees, you at $100/hr, 4 others at $150/hr
 * // = 1 × ($100 + 4 × $150) = $700
 * calculateMeetingCost(1, 5, 100) // returns 700
 */
export function calculateMeetingCost(
  durationInHours: number,
  attendees: number,
  hourlyRate: number,
): number {
  if (attendees <= 0) return 0;
  const otherAttendees = Math.max(0, attendees - 1);
  const totalHourlyRate = hourlyRate + otherAttendees * BLENDED_HOURLY_RATE;
  return durationInHours * totalHourlyRate;
}

/**
 * Context switch cost in hours (20 minutes).
 * Based on Gloria Mark's research at UC Irvine which found it takes
 * approximately 23 minutes to refocus after an interruption.
 * We use 20 minutes (0.33 hours) as a conservative estimate.
 *
 * @see https://www.ics.uci.edu/~gmark/chi08-mark.pdf
 */
const CONTEXT_SWITCH_COST_HOURS = 0.33;

/**
 * Calculates the total "mental tax" from context switching between meetings.
 *
 * **Formula:** `numberOfMeetings × 0.33 hours`
 *
 * Each meeting requires mental setup and teardown time. Research by Gloria Mark
 * at UC Irvine shows it takes ~23 minutes to fully refocus after an interruption.
 * This function estimates the hidden productivity cost of fragmented schedules.
 *
 * @param meetings - Array of meetings to analyze
 * @returns Total hours lost to context switching
 *
 * @example
 * // 10 meetings = ~3.3 hours lost to context switching
 * calculateMentalTax(meetingsArray) // returns 3.3
 */
export function calculateMentalTax(meetings: Meeting[]): number {
  return meetings.length * CONTEXT_SWITCH_COST_HOURS;
}

/**
 * Calculates a "Meeting Quality" score based on meeting characteristics.
 *
 * **Scoring System:**
 * - Base score: 100 points per meeting
 * - Duration penalty: -20 points per hour over 1 hour
 * - Attendee penalty: -10 points per person over 6 (Amazon's "2-pizza rule")
 * - Minimum score per meeting: 0
 * - Final score: Average across all meetings (rounded)
 *
 * **Rationale:**
 * - Meetings over 1 hour see diminishing returns due to attention fatigue
 * - Large meetings (>6 people) reduce participation and decision quality
 * - The "2-pizza rule" suggests optimal team size is what 2 pizzas can feed
 *
 * @param meetings - Array of meetings to score
 * @returns Efficiency score from 0-100 (higher is better)
 *
 * @example
 * // Perfect 30-min meeting with 4 people = 100
 * // 2-hour meeting with 10 people = 100 - 20 - 40 = 40
 */
export function calculateEfficiencyScore(meetings: Meeting[]): number {
  if (meetings.length === 0) return 100;

  let totalScore = 0;

  for (const meeting of meetings) {
    let score = 100;

    // Penalize duration > 1 hour (-20 points per extra hour)
    if (meeting.durationInHours > 1) {
      score -= (meeting.durationInHours - 1) * 20;
    }

    // Penalize attendees > 6 (-10 points per extra person)
    if (meeting.attendees > 6) {
      score -= (meeting.attendees - 6) * 10;
    }

    totalScore += Math.max(0, score);
  }

  return Math.round(totalScore / meetings.length);
}

/**
 * Returns the best "Pay For X" comparison item from each category.
 *
 * For a given total cost, finds the most expensive affordable item in each
 * category to provide relatable comparisons (e.g., "Your meetings cost as
 * much as 3 MacBook Pros").
 *
 * @param totalCost - Total meeting cost to compare against
 * @returns Array of items with quantities, one per category that has affordable items
 *
 * @example
 * getPayForXComparisons(5000)
 * // Returns items like { name: "MacBook Pro", cost: 2499, quantity: 2 }
 */
export function getPayForXComparisons(totalCost: number) {
  const categories: ItemCategory[] = ["daily", "business", "luxury", "tesla"];

  return categories
    .map((category) => {
      const itemsInCategory = PAY_FOR_X_ITEMS.filter(
        (i) => i.category === category,
      );
      // Find affordable items and prefer the most expensive to keep quantity reasonable
      const affordableItems = itemsInCategory
        .map((item) => ({
          ...item,
          quantity: Math.floor(totalCost / item.cost),
        }))
        .filter((item) => item.quantity > 0)
        .sort((a, b) => a.cost - b.cost);

      // Return the most expensive affordable item (last after sorting by cost ascending)
      return affordableItems.length > 0
        ? affordableItems[affordableItems.length - 1]
        : null;
    })
    .filter((item) => item !== null);
}

/**
 * Returns all affordable "Pay For X" items organized by category.
 *
 * Unlike `getPayForXComparisons` which returns one item per category,
 * this returns all items the user could afford, grouped and sorted.
 *
 * @param totalCost - Total meeting cost to compare against
 * @returns Object with category keys and arrays of affordable items (sorted by cost)
 *
 * @example
 * getCategorizedPayForX(10000)
 * // Returns { daily: [...], luxury: [...], tesla: [...] }
 */
export function getCategorizedPayForX(totalCost: number) {
  const results: Record<string, PayForXItem[]> = {};

  const categories: ItemCategory[] = [
    "daily",
    "luxury",
    "tesla",
    "housing",
    "extra-luxury",
  ];

  PAY_FOR_X_ITEMS.forEach((item) => {
    const quantity = Math.floor(totalCost / item.cost);
    if (quantity > 0) {
      if (!results[item.category]) results[item.category] = [];
      results[item.category].push({ ...item, quantity });
    }
  });

  // Preserve category order and sort items by cost within each category
  const orderedResults: Record<string, PayForXItem[]> = {};

  categories.forEach((cat) => {
    if (results[cat] && results[cat].length > 0) {
      orderedResults[cat] = results[cat].sort((a, b) => a.cost - b.cost);
    }
  });

  return orderedResults;
}

/**
 * Identifies meetings that are good candidates for optimization or removal.
 *
 * **Selection Criteria:**
 * - Cost exceeds threshold (5× hourly rate, representing ~5 person-hours)
 * - OR: Large meeting (>10 people) lasting 1+ hours
 *
 * These are "budget burners" that have outsized impact on meeting costs
 * and may benefit from being shortened, split, or made asynchronous.
 *
 * @param meetings - Array of meetings to analyze
 * @param hourlyRate - Hourly rate used to calculate cost threshold (default: 100)
 * @returns Top 5 most expensive meetings matching criteria, sorted by cost descending
 *
 * @example
 * getCalendarCleanupSuggestions(meetings, 150)
 * // Returns meetings costing >$750 or large meetings
 */
export function getCalendarCleanupSuggestions(
  meetings: Meeting[],
  hourlyRate: number = 100,
) {
  // Threshold = 5 person-hours worth of time
  const costThreshold = hourlyRate * 5;
  return meetings
    .filter(
      (m) =>
        m.cost > costThreshold || (m.attendees > 10 && m.durationInHours >= 1),
    )
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5);
}

/**
 * Represents a dashboard insight/notification to display to the user.
 */
export interface DashboardInsight {
  title: string;
  description: string;
  color: string;
  icon: "CheckCircle" | "AlertTriangle" | "AlertOctagon" | "Info";
}
