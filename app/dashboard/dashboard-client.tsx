"use client";

import { useState, useMemo } from "react";
import {
  Meeting,
  calculateMeetingCost,
  calculateMentalTax,
  calculateEfficiencyScore,
  getCalendarCleanupSuggestions,
  getCategorizedPayForX,
} from "@/lib/metrics";
import { BENCHMARKS } from "@/lib/constants";
import {
  DashboardHeader,
  MetricCard,
  DailyCostChart,
  BudgetBurnersList,
  PayForXCard,
} from "@/components/dashboard";
import { DollarSign, TrendingDown, CheckCircle2 } from "lucide-react";

interface DashboardClientProps {
  initialMeetings: Meeting[];
  demoRate?: number;
}

export default function DashboardClient({
  initialMeetings,
  demoRate,
}: DashboardClientProps) {
  const [userHourlyRate, setUserHourlyRate] = useState(100);

  const hourlyRate = demoRate ?? userHourlyRate;
  const currencySymbol = "$";

  const meetings = useMemo(() => {
    return initialMeetings.map((m) => ({
      ...m,
      cost: calculateMeetingCost(m.durationInHours, m.attendees, hourlyRate),
    }));
  }, [initialMeetings, hourlyRate]);

  const totalCost = useMemo(
    () => meetings.reduce((acc, m) => acc + m.cost, 0),
    [meetings],
  );

  const efficiencyScore = useMemo(
    () => calculateEfficiencyScore(meetings),
    [meetings],
  );

  const categorizedPayForX = useMemo(
    () => getCategorizedPayForX(totalCost),
    [totalCost],
  );

  const cleanupSuggestions = useMemo(
    () => getCalendarCleanupSuggestions(meetings, hourlyRate),
    [meetings, hourlyRate],
  );

  const meetingTax = useMemo(() => calculateMentalTax(meetings), [meetings]);

  const dailyData = useMemo(() => {
    const grouped = meetings.reduce(
      (acc, m) => {
        const dateObj = new Date(m.startTime);
        const date = dateObj.toISOString().split("T")[0];

        if (!acc[date]) acc[date] = { date, cost: 0, count: 0 };
        acc[date].cost += m.cost;
        acc[date].count += 1;
        return acc;
      },
      {} as Record<string, { date: string; cost: number; count: number }>,
    );

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [meetings]);

  return (
    <div className="min-h-screen bg-neutral-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-8">
        <DashboardHeader
          hourlyRate={hourlyRate}
          currencySymbol={currencySymbol}
          isDemo={!!demoRate}
          onHourlyRateChange={setUserHourlyRate}
        />

        {/* Key Metrics */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <MetricCard
            title="Total Spend (30d)"
            value={`${currencySymbol}${totalCost.toLocaleString()}`}
            description={`Based on ${meetings.length} meetings`}
            icon={DollarSign}
          />
          <MetricCard
            title="Mental Tax"
            value={`+${Math.round(meetingTax)} hrs`}
            description="Lost to context switching (+20m per meeting)"
            icon={TrendingDown}
            valueClassName="text-amber-600"
          />
          <MetricCard
            title="Meeting Quality"
            value={`${efficiencyScore}/100`}
            description="Avg. score based on duration & attendees"
            icon={CheckCircle2}
            valueClassName={
              efficiencyScore >= BENCHMARKS.EFFICIENCY_SCORE_GOOD
                ? "text-green-600"
                : "text-amber-600"
            }
          />
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-7 items-start">
          {/* Left Column: Chart & Cleanup */}
          <div className="lg:col-span-4 space-y-4">
            <DailyCostChart data={dailyData} />
            <BudgetBurnersList
              meetings={cleanupSuggestions}
              currencySymbol={currencySymbol}
            />
          </div>

          {/* Right Column: Pay For X */}
          <div className="lg:col-span-3">
            <PayForXCard
              categorizedItems={categorizedPayForX}
              currencySymbol={currencySymbol}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
