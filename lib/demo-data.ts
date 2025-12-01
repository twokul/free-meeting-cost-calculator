import { Meeting } from '@/lib/metrics';

export type DemoRole = 'software-engineer' | 'staff-engineer' | 'product-manager' | 'designer' | 'director' | 'c-level';

interface RoleConfig {
  titles: string[];
  meetingsPerDay: { min: number; max: number };
  duration: { min: number; max: number; skewLong?: boolean };
  attendees: { min: number; max: number; skewLarge?: boolean };
  recurringChance: number;
  hourlyRate: number;
}

const ROLE_CONFIGS: Record<DemoRole, RoleConfig> = {
  'software-engineer': {
    titles: ["Daily Standup", "Sprint Planning", "Retrospective", "Pair Programming", "Team Sync", "Demo Day", "Architecture Review"],
    meetingsPerDay: { min: 1, max: 3 },
    duration: { min: 0.5, max: 1 },
    attendees: { min: 3, max: 8 },
    recurringChance: 0.9,
    hourlyRate: 150,
  },
  'staff-engineer': {
    titles: ["Architecture Review", "Tech Spec Review", "Cross-team Sync", "Leadership Sync", "Incident Review", "Mentoring", "System Design"],
    meetingsPerDay: { min: 2, max: 5 },
    duration: { min: 0.5, max: 1.5 },
    attendees: { min: 2, max: 12 },
    recurringChance: 0.6,
    hourlyRate: 300,
  },
  'product-manager': {
    titles: ["Customer Interview", "Stakeholder Sync", "Roadmap Planning", "Design Review", "Engineering Sync", "Sales Sync", "Weekly Business Review"],
    meetingsPerDay: { min: 4, max: 8 },
    duration: { min: 0.5, max: 1 },
    attendees: { min: 2, max: 6 },
    recurringChance: 0.7,
    hourlyRate: 150,
  },
  'designer': {
    titles: ["Design Critique", "User Testing", "Design System Sync", "Product Sync", "Handoff Meeting", "Creative Jam", "Sprint Planning"],
    meetingsPerDay: { min: 2, max: 5 },
    duration: { min: 0.5, max: 2, skewLong: true }, // Designers often have longer work sessions
    attendees: { min: 3, max: 6 },
    recurringChance: 0.6,
    hourlyRate: 150,
  },
  'director': {
    titles: ["Department Strategy", "Budget Review", "Hiring Sync", "Management Weekly", "Board Prep", "All Hands", "Quarterly Planning"],
    meetingsPerDay: { min: 5, max: 9 },
    duration: { min: 0.5, max: 2 },
    attendees: { min: 4, max: 20, skewLarge: true },
    recurringChance: 0.8,
    hourlyRate: 500,
  },
  'c-level': {
    titles: ["Board Meeting", "Investor Call", "Executive Staff", "Strategic Partnership", "Press/Media", "All Hands", "Budget Committee"],
    meetingsPerDay: { min: 4, max: 10 },
    duration: { min: 0.5, max: 3, skewLong: true },
    attendees: { min: 2, max: 50, skewLarge: true }, // Mix of 1:1s and huge meetings
    recurringChance: 0.5,
    hourlyRate: 700,
  },
};

export const ROLE_LABELS: Record<DemoRole, string> = {
  'software-engineer': 'Software Engineer',
  'staff-engineer': 'Staff Engineer',
  'product-manager': 'Product Manager',
  'designer': 'Designer',
  'director': 'Director',
  'c-level': 'C-Level Exec',
};

export function getRoleHourlyRate(role: DemoRole): number {
  return ROLE_CONFIGS[role].hourlyRate;
}

export function generateDemoMeetings(days: number = 30, role: DemoRole = 'software-engineer'): Meeting[] {
  const meetings: Meeting[] = [];
  const now = new Date();
  const config = ROLE_CONFIGS[role];

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const day = date.getDay();
    if (day === 0 || day === 6) continue; // Skip weekends

    const numMeetings = Math.floor(Math.random() * (config.meetingsPerDay.max - config.meetingsPerDay.min + 1)) + config.meetingsPerDay.min;
    
    for (let j = 0; j < numMeetings; j++) {
      // Determine duration
      let duration = config.duration.min + (Math.random() * (config.duration.max - config.duration.min));
      if (config.duration.skewLong && Math.random() > 0.7) duration += 1; // Occasional long meeting
      duration = Math.round(duration * 2) / 2; // Round to nearest 0.5
      
      // Determine attendees
      let attendees = Math.floor(Math.random() * (config.attendees.max - config.attendees.min + 1)) + config.attendees.min;
      if (config.attendees.skewLarge && Math.random() > 0.8) attendees *= 2; // Occasional huge meeting

      const isRecurring = Math.random() < config.recurringChance;
      const title = config.titles[Math.floor(Math.random() * config.titles.length)];
      
      // Random start time 9am-5pm
      const startHour = 9 + Math.floor(Math.random() * 8);
      const startMin = Math.random() > 0.5 ? 30 : 0;
      
      const startTime = new Date(date);
      startTime.setHours(startHour, startMin, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + duration * 60);

      meetings.push({
        id: `demo-${i}-${j}`,
        title,
        startTime,
        endTime,
        durationInHours: duration,
        attendees,
        isRecurring,
        cost: 0, // Client calculates based on hourly rate
      });
    }
  }
  
  return meetings.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}
