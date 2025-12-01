/**
 * Meeting Cost Calculator - Constants Module
 *
 * Contains benchmark thresholds, item categories, and reference data
 * used throughout the application.
 *
 * @module constants
 */

/**
 * Benchmark thresholds for evaluating meeting health.
 *
 * These values are based on industry research and best practices
 * for meeting culture optimization.
 */
export const BENCHMARKS = {
  /**
   * Good meeting tax threshold (percentage of payroll).
   * Organizations spending <10% of payroll on meetings are considered efficient.
   */
  MEETING_TAX_GOOD: 10,

  /**
   * Warning threshold for meeting tax (percentage of payroll).
   * Organizations spending >20% should evaluate their meeting culture.
   */
  MEETING_TAX_BAD: 20,

  /**
   * Good efficiency score threshold.
   * Scores above 80 indicate well-structured meetings (right duration, right size).
   */
  EFFICIENCY_SCORE_GOOD: 80,
};

/**
 * Blended average hourly rate for other meeting attendees.
 * Represents a typical org mix of ICs (engineers, PMs, designers).
 * Used to calculate meeting costs more realistically—your rate for you,
 * this blended rate for other attendees.
 */
export const BLENDED_HOURLY_RATE = 175;

/**
 * Categories for "Pay For X" comparison items.
 * Used to group items by relatability and cost tier.
 */
export type ItemCategory =
  | "daily" // Everyday relatable items ($5-$1000)
  | "luxury" // Consumer tech and luxury goods ($250-$3000)
  | "business" // Business equipment (legacy, not actively used)
  | "tesla" // Tesla vehicles for scale ($39k-$250k)
  | "housing" // Real estate comparisons ($83k-$1.5M)
  | "extra-luxury"; // High-end luxury items ($10k-$285k)

/**
 * Reference items for "Pay For X" comparisons.
 *
 * These items help users contextualize abstract meeting costs
 * by comparing them to tangible purchases. Items are selected
 * to span multiple price points and categories.
 *
 * @example
 * "Your meetings cost as much as 47 fancy coffees"
 * "You could buy 2 MacBook Pros with your meeting budget"
 */
export const PAY_FOR_X_ITEMS = [
  // Daily / relatable items - things people buy regularly
  { name: "Coffee", cost: 6, icon: "☕", category: "daily" },
  { name: "Month of Netflix", cost: 23, icon: "📺", category: "daily" },
  { name: "Uber Ride", cost: 35, icon: "🚕", category: "daily" },
  { name: "Restaurant Lunch", cost: 20, icon: "🍔", category: "daily" },
  { name: "Monthly Gym Membership", cost: 50, icon: "🏋️", category: "daily" },
  { name: "Weekly Groceries", cost: 250, icon: "🛒", category: "daily" },
  { name: "Chipotle Burrito", cost: 12, icon: "🌯", category: "daily" },
  { name: "Standing Desk", cost: 1000, icon: "🏢", category: "daily" },

  // Luxury / Tech - aspirational consumer goods
  { name: "AirPods Pro", cost: 249, icon: "🎧", category: "luxury" },
  { name: "iPhone 16 Pro", cost: 999, icon: "📱", category: "luxury" },
  { name: "MacBook Pro", cost: 2499, icon: "💻", category: "luxury" },
  { name: "Herman Miller Aeron", cost: 1695, icon: "💺", category: "luxury" },
  { name: "Designer Sunglasses", cost: 500, icon: "🕶️", category: "luxury" },
  {
    name: "High-End Espresso Machine",
    cost: 3000,
    icon: "☕",
    category: "luxury",
  },
  { name: "Luxury Smartwatch", cost: 1200, icon: "⌚", category: "luxury" },

  // Tesla vehicles - widely recognized price anchors
  { name: "Tesla Model 3", cost: 38990, icon: "🚗", category: "tesla" },
  { name: "Tesla Model S", cost: 99990, icon: "🚗", category: "tesla" },
  { name: "Tesla Cybertruck", cost: 110000, icon: "🚗", category: "tesla" },
  { name: "Tesla Roadster", cost: 250000, icon: "🚗", category: "tesla" },

  // Housing - major life purchases for scale
  { name: "House Down Payment", cost: 83000, icon: "🏠", category: "housing" },
  { name: "Median US Home", cost: 415000, icon: "🏡", category: "housing" },
  { name: "SF / NYC Home", cost: 1500000, icon: "🌉", category: "housing" },

  // Extra-luxury - high-end items for large cost comparisons
  {
    name: "Hermes Birkin Bag",
    cost: 12700,
    icon: "👜",
    category: "extra-luxury",
  },
  {
    name: "Rolex Submariner",
    cost: 10250,
    icon: "⌚",
    category: "extra-luxury",
  },
  { name: "Rolex Daytona", cost: 15100, icon: "⌚", category: "extra-luxury" },
  {
    name: "Porsche 911 Carrera",
    cost: 122095,
    icon: "🚗",
    category: "extra-luxury",
  },
  { name: "McLaren 720S", cost: 285000, icon: "🏎️", category: "extra-luxury" },
  {
    name: "McLaren Artura",
    cost: 237500,
    icon: "🏎️",
    category: "extra-luxury",
  },
] as const;

/**
 * Supported currency options for display.
 */
export const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
] as const;
