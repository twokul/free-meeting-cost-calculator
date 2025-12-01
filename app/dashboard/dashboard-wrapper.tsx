"use client";

import { useState } from "react";
import DashboardClient from "./dashboard-client";
import { Meeting } from "@/lib/metrics";
import {
  CalculatorSettings,
  DEFAULT_SETTINGS,
} from "@/components/SettingsDialog";

interface DashboardWrapperProps {
  initialMeetings: Meeting[];
}

export default function DashboardWrapper({
  initialMeetings,
}: DashboardWrapperProps) {
  const [settings, setSettings] =
    useState<CalculatorSettings>(DEFAULT_SETTINGS);

  return (
    <DashboardClient
      initialMeetings={initialMeetings}
      settings={settings}
      onSettingsChange={setSettings}
    />
  );
}
