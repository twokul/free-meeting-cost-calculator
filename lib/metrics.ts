import { PAY_FOR_X_ITEMS, ItemCategory } from "./constants";

export type PayForXItem = (typeof PAY_FOR_X_ITEMS)[number] & {
  quantity: number;
};

export interface Meeting {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  durationInHours: number;
  attendees: number;
  isRecurring: boolean;
  cost: number;
}

export function calculateMeetingCost(
  durationInHours: number,
  attendees: number,
  hourlyRate: number
): number {
  return durationInHours * attendees * hourlyRate;
}

// Mental Tax: The cost of context switching.
// Research suggests it takes ~23 minutes to refocus after an interruption.
// We'll estimate this as 20 minutes (0.33 hours) of "tax" per meeting.
export function calculateMentalTax(meetings: Meeting[]): number {
  const CONTEXT_SWITCH_COST_HOURS = 0.33; // 20 minutes
  return meetings.length * CONTEXT_SWITCH_COST_HOURS;
}

// Efficiency Score: Higher is better.
// Penalize long meetings, large meetings.
// 100 is perfect.
export function calculateEfficiencyScore(meetings: Meeting[]): number {
  if (meetings.length === 0) return 100;

  let totalScore = 0;

  for (const meeting of meetings) {
    let score = 100;

    // Penalize duration > 1 hour
    if (meeting.durationInHours > 1) {
      score -= (meeting.durationInHours - 1) * 20;
    }

    // Penalize attendees > 6 (Amazon's 2 pizza rule)
    if (meeting.attendees > 6) {
      score -= (meeting.attendees - 6) * 10;
    }

    totalScore += Math.max(0, score);
  }

  return Math.round(totalScore / meetings.length);
}

export function getPayForXComparisons(totalCost: number) {
  // Get one best fit from each category
  const categories: ItemCategory[] = ["daily", "business", "luxury", "tesla"];

  return categories
    .map((category) => {
      const itemsInCategory = PAY_FOR_X_ITEMS.filter(
        (i) => i.category === category
      );
      // Find the item where we can buy at least 1, and quantity isn't absurdly high (e.g. 10000 coffees)
      // Prefer the most expensive item we can afford in that category (to keep quantity reasonable)
      const affordableItems = itemsInCategory
        .map((item) => ({
          ...item,
          quantity: Math.floor(totalCost / item.cost),
        }))
        .filter((item) => item.quantity > 0)
        .sort((a, b) => a.cost - b.cost); // Sort cheap to expensive

      // Pick the most expensive one we can afford (last in list)
      return affordableItems.length > 0
        ? affordableItems[affordableItems.length - 1]
        : null;
    })
    .filter((item) => item !== null);
}

export function getCategorizedPayForX(totalCost: number) {
  const results: Record<
    string,
    ((typeof PAY_FOR_X_ITEMS)[0] & { quantity: number })[]
  > = {};

  // Initialize categories order
  const categories: ItemCategory[] = [
    "daily",
    "luxury",
    "tesla",
    "housing",
    "extra-luxury",
    "daily",
  ];

  PAY_FOR_X_ITEMS.forEach((item) => {
    const quantity = Math.floor(totalCost / item.cost);
    if (quantity > 0) {
      if (!results[item.category]) results[item.category] = [];
      results[item.category].push({ ...item, quantity });
    }
  });

  // Filter out categories with no items and sort items by cost
  const orderedResults: Record<
    string,
    ((typeof PAY_FOR_X_ITEMS)[0] & { quantity: number })[]
  > = {};

  categories.forEach((cat) => {
    if (results[cat] && results[cat].length > 0) {
      orderedResults[cat] = results[cat].sort((a, b) => a.cost - b.cost);
    }
  });

  return orderedResults;
}

export function getCalendarCleanupSuggestions(meetings: Meeting[]) {
  // Identify expensive recurring meetings or long meetings with many people
  return meetings
    .filter((m) => m.cost > 500 || (m.attendees > 10 && m.durationInHours >= 1))
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5);
}

export interface DashboardInsight {
  title: string;
  description: string;
  color: string;
  icon: "CheckCircle" | "AlertTriangle" | "AlertOctagon" | "Info";
}
