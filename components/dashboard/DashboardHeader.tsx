"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

interface DashboardHeaderProps {
  hourlyRate: number;
  currencySymbol: string;
  isDemo: boolean;
  onHourlyRateChange: (rate: number) => void;
}

export function DashboardHeader({
  hourlyRate,
  currencySymbol,
  isDemo,
  onHourlyRateChange,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Meeting Cost Dashboard
        </h1>
        <div className="flex flex-wrap items-center gap-1 md:gap-2 text-sm md:text-base text-neutral-500 mt-1">
          <span>Last 30 days based on</span>
          <span className="font-medium text-neutral-900">
            {currencySymbol}
            {hourlyRate}/hr avg.
          </span>
        </div>
      </div>

      {!isDemo && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dashboard Settings</DialogTitle>
              <DialogDescription>
                Adjust the parameters used to calculate meeting costs.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="rate"
                  className="text-right text-sm font-medium"
                >
                  Hourly Rate
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <span className="text-sm font-bold">{currencySymbol}</span>
                  <Input
                    id="rate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => onHourlyRateChange(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
