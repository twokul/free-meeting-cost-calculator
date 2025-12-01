export const BENCHMARKS = {
  MEETING_TAX_GOOD: 10, // < 10% of payroll is good
  MEETING_TAX_BAD: 20, // > 20% is warning territory
  EFFICIENCY_SCORE_GOOD: 80,
};

export type ItemCategory =
  | "daily"
  | "luxury"
  | "business"
  | "expensive"
  | "housing"
  | "extra-luxury";

export const PAY_FOR_X_ITEMS = [
  // Daily / relatable
  { name: "Fancy Coffee", cost: 6, icon: "☕", category: "daily" },
  { name: "Month of Netflix", cost: 23, icon: "📺", category: "daily" },
  { name: "Uber Ride", cost: 35, icon: "🚕", category: "daily" },
  { name: "Restaurant Lunch", cost: 20, icon: "🍔", category: "daily" },
  { name: "Monthly Gym Membership", cost: 50, icon: "🏋️", category: "daily" },
  { name: "Weekly Groceries", cost: 250, icon: "🛒", category: "daily" },
  { name: "Chipotle Burrito", cost: 12, icon: "🌯", category: "daily" },
  { name: "Standing Desk", cost: 1000, icon: "🏢", category: "daily" },
  { name: "AirPods Pro", cost: 249, icon: "🎧", category: "luxury" },
  { name: "iPhone 16 Pro", cost: 999, icon: "📱", category: "luxury" },
  { name: "MacBook Pro", cost: 2499, icon: "💻", category: "luxury" },
  { name: "Herman Miller Aeron", cost: 1695, icon: "💺", category: "luxury" },

  // Luxury / Tech
  { name: "Designer Sunglasses", cost: 500, icon: "🕶️", category: "luxury" },
  {
    name: "High-End Espresso Machine",
    cost: 3000,
    icon: "☕",
    category: "luxury",
  },
  { name: "Luxury Smartwatch", cost: 1200, icon: "⌚", category: "luxury" },

  // Transportation
  { name: "Tesla Model 3", cost: 38990, icon: "🚗", category: "expensive" },
  { name: "Tesla Model S", cost: 99990, icon: "🚗", category: "expensive" },
  { name: "Tesla Cybertruck", cost: 110000, icon: "🚗", category: "expensive" },
  { name: "Tesla Roadster", cost: 250000, icon: "🚗", category: "expensive" },

  // Housing
  { name: "House Down Payment", cost: 83000, icon: "🏠", category: "housing" },
  { name: "Median US Home", cost: 415000, icon: "🏡", category: "housing" },
  { name: "SF / NYC Home", cost: 1500000, icon: "🌉", category: "housing" },

  // Extra-luxury
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
];

export const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
];
