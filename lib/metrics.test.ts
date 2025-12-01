import { describe, expect, test } from "bun:test";
import {
  calculateMeetingCost,
  calculateMentalTax,
  calculateEfficiencyScore,
  getPayForXComparisons,
  getCategorizedPayForX,
  getCalendarCleanupSuggestions,
  Meeting,
} from "./metrics";

// Helper to create a mock meeting
function createMeeting(overrides: Partial<Meeting> = {}): Meeting {
  return {
    id: "test-1",
    title: "Test Meeting",
    startTime: new Date("2024-01-15T10:00:00"),
    endTime: new Date("2024-01-15T11:00:00"),
    durationInHours: 1,
    attendees: 5,
    isRecurring: false,
    cost: 0,
    ...overrides,
  };
}

describe("calculateMeetingCost", () => {
  // New formula: duration × (yourRate + (attendees - 1) × blendedRate)
  // Blended rate = $150/hr

  test("calculates basic meeting cost with blended rate", () => {
    // 1 hour, 5 attendees, you at $100/hr, 4 others at $150/hr
    // = 1 × ($100 + 4 × $150) = $700
    expect(calculateMeetingCost(1, 5, 100)).toBe(700);
  });

  test("handles fractional hours", () => {
    // 1.5 hours, 4 attendees, you at $100/hr, 3 others at $150/hr
    // = 1.5 × ($100 + 3 × $150) = 1.5 × $550 = $825
    expect(calculateMeetingCost(1.5, 4, 100)).toBe(825);
  });

  test("handles different hourly rates", () => {
    // 1 hour, 10 attendees, you at $150/hr, 9 others at $150/hr
    // = 1 × ($150 + 9 × $150) = $1500 (same as before when your rate = blended)
    expect(calculateMeetingCost(1, 10, 150)).toBe(1500);
  });

  test("returns 0 for zero duration", () => {
    expect(calculateMeetingCost(0, 5, 100)).toBe(0);
  });

  test("returns 0 for zero attendees", () => {
    expect(calculateMeetingCost(1, 0, 100)).toBe(0);
  });

  test("handles large meetings", () => {
    // 3 hours, 50 attendees, you at $200/hr, 49 others at $150/hr
    // = 3 × ($200 + 49 × $150) = 3 × $7550 = $22,650
    expect(calculateMeetingCost(3, 50, 200)).toBe(22650);
  });

  test("solo meeting uses only your rate", () => {
    // 1 hour, just you at $500/hr
    // = 1 × $500 = $500
    expect(calculateMeetingCost(1, 1, 500)).toBe(500);
  });

  test("director rate with typical attendees", () => {
    // 1 hour, 5 attendees, you (director) at $500/hr, 4 others at $150/hr
    // = 1 × ($500 + 4 × $150) = $1100
    expect(calculateMeetingCost(1, 5, 500)).toBe(1100);
  });
});

describe("calculateMentalTax", () => {
  test("returns 0 for empty meeting array", () => {
    expect(calculateMentalTax([])).toBe(0);
  });

  test("calculates mental tax for single meeting", () => {
    const meetings = [createMeeting()];
    // 1 meeting × 0.33 hours = 0.33 hours
    expect(calculateMentalTax(meetings)).toBeCloseTo(0.33, 2);
  });

  test("calculates mental tax for multiple meetings", () => {
    const meetings = [
      createMeeting({ id: "1" }),
      createMeeting({ id: "2" }),
      createMeeting({ id: "3" }),
    ];
    // 3 meetings × 0.33 hours = 0.99 hours
    expect(calculateMentalTax(meetings)).toBeCloseTo(0.99, 2);
  });

  test("calculates mental tax for 10 meetings", () => {
    const meetings = Array.from({ length: 10 }, (_, i) =>
      createMeeting({ id: `meeting-${i}` }),
    );
    // 10 meetings × 0.33 hours = 3.3 hours
    expect(calculateMentalTax(meetings)).toBeCloseTo(3.3, 2);
  });
});

describe("calculateEfficiencyScore", () => {
  test("returns 100 for empty meeting array", () => {
    expect(calculateEfficiencyScore([])).toBe(100);
  });

  test("returns 100 for perfect meeting (<=1hr, <=6 people)", () => {
    const meetings = [createMeeting({ durationInHours: 1, attendees: 6 })];
    expect(calculateEfficiencyScore(meetings)).toBe(100);
  });

  test("returns 100 for short meeting with few people", () => {
    const meetings = [createMeeting({ durationInHours: 0.5, attendees: 3 })];
    expect(calculateEfficiencyScore(meetings)).toBe(100);
  });

  test("penalizes meetings longer than 1 hour", () => {
    // 2 hour meeting: 100 - (1 × 20) = 80
    const meetings = [createMeeting({ durationInHours: 2, attendees: 5 })];
    expect(calculateEfficiencyScore(meetings)).toBe(80);
  });

  test("penalizes meetings with more than 6 attendees", () => {
    // 10 attendees: 100 - (4 × 10) = 60
    const meetings = [createMeeting({ durationInHours: 1, attendees: 10 })];
    expect(calculateEfficiencyScore(meetings)).toBe(60);
  });

  test("applies both duration and attendee penalties", () => {
    // 2 hours, 10 people: 100 - 20 - 40 = 40
    const meetings = [createMeeting({ durationInHours: 2, attendees: 10 })];
    expect(calculateEfficiencyScore(meetings)).toBe(40);
  });

  test("floors score at 0 for very bad meetings", () => {
    // 5 hours, 20 people: 100 - 80 - 140 = -120 → 0
    const meetings = [createMeeting({ durationInHours: 5, attendees: 20 })];
    expect(calculateEfficiencyScore(meetings)).toBe(0);
  });

  test("averages scores across multiple meetings", () => {
    const meetings = [
      createMeeting({ id: "1", durationInHours: 1, attendees: 5 }), // 100
      createMeeting({ id: "2", durationInHours: 2, attendees: 10 }), // 40
    ];
    // (100 + 40) / 2 = 70
    expect(calculateEfficiencyScore(meetings)).toBe(70);
  });

  test("rounds the final score", () => {
    const meetings = [
      createMeeting({ id: "1", durationInHours: 1, attendees: 5 }), // 100
      createMeeting({ id: "2", durationInHours: 1, attendees: 5 }), // 100
      createMeeting({ id: "3", durationInHours: 2, attendees: 8 }), // 80 - 20 = 60
    ];
    // (100 + 100 + 60) / 3 = 86.666... → 87
    expect(calculateEfficiencyScore(meetings)).toBe(87);
  });
});

describe("getPayForXComparisons", () => {
  test("returns empty array for zero cost", () => {
    expect(getPayForXComparisons(0)).toEqual([]);
  });

  test("returns empty array for very small cost", () => {
    // Less than cheapest item (Fancy Coffee at $6)
    expect(getPayForXComparisons(5)).toEqual([]);
  });

  test("returns items for moderate cost", () => {
    const result = getPayForXComparisons(500);
    expect(result.length).toBeGreaterThan(0);
    // Should have at least one item with quantity > 0
    expect(result.every((item) => item.quantity > 0)).toBe(true);
  });

  test("returns items from multiple categories", () => {
    const result = getPayForXComparisons(5000);
    const categories = new Set(result.map((item) => item.category));
    expect(categories.size).toBeGreaterThan(1);
  });

  test("calculates quantities correctly", () => {
    const result = getPayForXComparisons(100);
    // Should be able to afford ~16 coffees at $6 each
    const dailyItem = result.find((item) => item.category === "daily");
    expect(dailyItem).toBeDefined();
    if (dailyItem) {
      expect(dailyItem.quantity).toBeLessThanOrEqual(Math.floor(100 / 6));
    }
  });
});

describe("getCategorizedPayForX", () => {
  test("returns empty object for zero cost", () => {
    const result = getCategorizedPayForX(0);
    expect(Object.keys(result)).toHaveLength(0);
  });

  test("returns daily items for small cost", () => {
    const result = getCategorizedPayForX(100);
    expect(result.daily).toBeDefined();
    expect(result.daily.length).toBeGreaterThan(0);
  });

  test("includes luxury items for larger costs", () => {
    const result = getCategorizedPayForX(3000);
    expect(result.luxury).toBeDefined();
    expect(result.luxury.length).toBeGreaterThan(0);
  });

  test("includes tesla category for very large costs", () => {
    const result = getCategorizedPayForX(50000);
    expect(result.tesla).toBeDefined();
    expect(result.tesla.length).toBeGreaterThan(0);
  });

  test("sorts items by cost within each category", () => {
    const result = getCategorizedPayForX(5000);
    if (result.daily && result.daily.length > 1) {
      for (let i = 1; i < result.daily.length; i++) {
        expect(result.daily[i].cost).toBeGreaterThanOrEqual(
          result.daily[i - 1].cost,
        );
      }
    }
  });

  test("does not have duplicate categories", () => {
    const result = getCategorizedPayForX(100000);
    const categories = Object.keys(result);
    const uniqueCategories = new Set(categories);
    expect(categories.length).toBe(uniqueCategories.size);
  });

  test("calculates correct quantities", () => {
    const result = getCategorizedPayForX(1000);
    // At $1000, we can afford 166 coffees at $6 each
    const coffeeItem = result.daily?.find(
      (item) => item.name === "Fancy Coffee",
    );
    expect(coffeeItem?.quantity).toBe(Math.floor(1000 / 6));
  });
});

describe("getCalendarCleanupSuggestions", () => {
  test("returns empty array for no meetings", () => {
    expect(getCalendarCleanupSuggestions([])).toEqual([]);
  });

  test("returns empty array when no meetings exceed threshold", () => {
    const meetings = [
      createMeeting({ cost: 100, attendees: 5, durationInHours: 0.5 }),
    ];
    expect(getCalendarCleanupSuggestions(meetings, 100)).toEqual([]);
  });

  test("returns meetings exceeding cost threshold", () => {
    const meetings = [
      createMeeting({ id: "1", cost: 600, attendees: 5, durationInHours: 1 }),
    ];
    // Default threshold: 100 × 5 = 500
    const result = getCalendarCleanupSuggestions(meetings, 100);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  test("returns large meetings even if cost is below threshold", () => {
    const meetings = [
      createMeeting({ id: "1", cost: 300, attendees: 15, durationInHours: 1 }),
    ];
    const result = getCalendarCleanupSuggestions(meetings, 100);
    expect(result).toHaveLength(1);
  });

  test("threshold scales with hourly rate", () => {
    const meetings = [
      createMeeting({ id: "1", cost: 600, attendees: 5, durationInHours: 1 }),
    ];
    // At $200/hr, threshold = $1000, so $600 meeting should NOT be included
    const result = getCalendarCleanupSuggestions(meetings, 200);
    expect(result).toHaveLength(0);
  });

  test("sorts by cost descending", () => {
    const meetings = [
      createMeeting({ id: "1", cost: 600, attendees: 5, durationInHours: 1 }),
      createMeeting({ id: "2", cost: 1200, attendees: 5, durationInHours: 1 }),
      createMeeting({ id: "3", cost: 800, attendees: 5, durationInHours: 1 }),
    ];
    const result = getCalendarCleanupSuggestions(meetings, 100);
    expect(result[0].cost).toBe(1200);
    expect(result[1].cost).toBe(800);
    expect(result[2].cost).toBe(600);
  });

  test("limits to top 5 suggestions", () => {
    const meetings = Array.from({ length: 10 }, (_, i) =>
      createMeeting({ id: `meeting-${i}`, cost: 1000 + i * 100 }),
    );
    const result = getCalendarCleanupSuggestions(meetings, 100);
    expect(result).toHaveLength(5);
  });

  test("uses default hourly rate of 100 when not provided", () => {
    const meetings = [
      createMeeting({ id: "1", cost: 600, attendees: 5, durationInHours: 1 }),
    ];
    // Default threshold: 100 × 5 = 500
    const result = getCalendarCleanupSuggestions(meetings);
    expect(result).toHaveLength(1);
  });
});
