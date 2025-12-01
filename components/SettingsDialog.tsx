"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface CalculatorSettings {
  hourlyRate: number;
  blendedHourlyRate: number;
  contextSwitchMinutes: number;
  efficiencyScoreThreshold: number;
  meetingTaxGood: number;
  meetingTaxBad: number;
}

export const DEFAULT_SETTINGS: CalculatorSettings = {
  hourlyRate: 100,
  blendedHourlyRate: 175,
  contextSwitchMinutes: 20,
  efficiencyScoreThreshold: 80,
  meetingTaxGood: 10,
  meetingTaxBad: 20,
};

interface SettingsDialogProps {
  settings: CalculatorSettings;
  onSettingsChange: (settings: CalculatorSettings) => void;
}

export function SettingsDialog({
  settings,
  onSettingsChange,
}: SettingsDialogProps) {
  const updateSetting = <K extends keyof CalculatorSettings>(
    key: K,
    value: CalculatorSettings[K],
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          title="Adjust calculation settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Calculator Settings</DialogTitle>
          <DialogDescription>
            Adjust the parameters used to calculate meeting costs.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Calculation Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900">
              Calculation
            </h3>

            <div className="grid gap-3">
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm text-neutral-600">
                  Your Hourly Rate
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-neutral-500">$</span>
                  <Input
                    type="number"
                    value={settings.hourlyRate}
                    onChange={(e) =>
                      updateSetting("hourlyRate", Number(e.target.value))
                    }
                    className="w-24 h-8 text-right"
                    min={0}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="text-sm text-neutral-600">
                  Blended Rate (others)
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-neutral-500">$</span>
                  <Input
                    type="number"
                    value={settings.blendedHourlyRate}
                    onChange={(e) =>
                      updateSetting("blendedHourlyRate", Number(e.target.value))
                    }
                    className="w-24 h-8 text-right"
                    min={0}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="text-sm text-neutral-600">
                  Context Switch Cost
                </label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="number"
                    value={settings.contextSwitchMinutes}
                    onChange={(e) =>
                      updateSetting(
                        "contextSwitchMinutes",
                        Number(e.target.value),
                      )
                    }
                    className="w-20 h-8 text-right"
                    min={0}
                    max={60}
                  />
                  <span className="text-sm text-neutral-500">min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benchmark Thresholds */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900">
              Benchmark Thresholds
            </h3>

            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-neutral-600">
                    Efficiency Score (good if ≥)
                  </label>
                  <span className="text-sm font-medium tabular-nums">
                    {settings.efficiencyScoreThreshold}
                  </span>
                </div>
                <Slider
                  value={[settings.efficiencyScoreThreshold]}
                  onValueChange={([v]) =>
                    updateSetting("efficiencyScoreThreshold", v)
                  }
                  min={50}
                  max={100}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-neutral-600">
                    Meeting Tax Range
                  </label>
                  <span className="text-sm font-medium tabular-nums">
                    {settings.meetingTaxGood}% – {settings.meetingTaxBad}%
                  </span>
                </div>
                <Slider
                  value={[settings.meetingTaxGood, settings.meetingTaxBad]}
                  onValueChange={([good, bad]) => {
                    updateSetting("meetingTaxGood", good);
                    updateSetting("meetingTaxBad", bad);
                  }}
                  min={0}
                  max={50}
                  step={1}
                />
                <p className="text-xs text-neutral-500">
                  Good (green) below {settings.meetingTaxGood}%, bad (red) above{" "}
                  {settings.meetingTaxBad}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
