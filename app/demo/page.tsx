"use client";

import { useState, useMemo } from "react";
import DashboardClient from "../dashboard/dashboard-client";
import {
  generateDemoMeetings,
  DemoRole,
  ROLE_LABELS,
  getRoleHourlyRate,
} from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const [role, setRole] = useState<DemoRole>("software-engineer");

  const demoMeetings = useMemo(() => {
    return generateDemoMeetings(30, role);
  }, [role]);

  const demoRate = useMemo(() => {
    return getRoleHourlyRate(role);
  }, [role]);

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <div className="bg-amber-500/10 border-b border-amber-500/20 p-2 text-center text-amber-500 text-xs md:text-sm font-medium">
        Using generated demo data
      </div>

      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-3 py-3 md:p-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-3 md:gap-4">
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
            {(Object.keys(ROLE_LABELS) as DemoRole[]).map((r) => (
              <Button
                key={r}
                variant={role === r ? "default" : "outline"}
                size="sm"
                onClick={() => setRole(r)}
                className="rounded-full text-xs md:text-sm px-2.5 md:px-3 h-7 md:h-8"
              >
                {ROLE_LABELS[r]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <DashboardClient initialMeetings={demoMeetings} demoRate={demoRate} />
    </div>
  );
}
