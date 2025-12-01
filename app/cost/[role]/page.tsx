"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardClient from "../../dashboard/dashboard-client";
import {
  generateDemoMeetings,
  DemoRole,
  ROLE_LABELS,
  getRoleHourlyRate,
  VALID_ROLES,
} from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import {
  SettingsDialog,
  CalculatorSettings,
  DEFAULT_SETTINGS,
} from "@/components/SettingsDialog";

export default function CostPage() {
  const params = useParams();
  const role = VALID_ROLES.includes(params.role as DemoRole)
    ? (params.role as DemoRole)
    : "software-engineer";

  const roleRate = getRoleHourlyRate(role);

  const [settings, setSettings] = useState<CalculatorSettings>(() => ({
    ...DEFAULT_SETTINGS,
    hourlyRate: roleRate,
  }));

  // Update hourly rate when role changes
  useMemo(() => {
    setSettings((prev) => ({ ...prev, hourlyRate: roleRate }));
  }, [roleRate]);

  const demoMeetings = useMemo(() => {
    return generateDemoMeetings(30, role);
  }, [role]);

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <div className="bg-amber-500/10 border-b border-amber-500/20 p-2 text-center text-amber-500 text-xs md:text-sm font-medium">
        Using generated demo data
      </div>

      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-3 py-3 md:p-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-3 md:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
            {VALID_ROLES.map((r) => (
              <Button
                key={r}
                variant={role === r ? "default" : "outline"}
                size="sm"
                asChild
                className="rounded-full text-xs md:text-sm px-2.5 md:px-3 h-7 md:h-8"
              >
                <Link href={`/cost/${r}`}>{ROLE_LABELS[r]}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <DashboardClient
        initialMeetings={demoMeetings}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
}
