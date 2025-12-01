import {
  SettingsDialog,
  CalculatorSettings,
} from "@/components/SettingsDialog";

interface DashboardHeaderProps {
  hourlyRate: number;
  currencySymbol: string;
  settings?: CalculatorSettings;
  onSettingsChange?: (settings: CalculatorSettings) => void;
}

export function DashboardHeader({
  hourlyRate,
  currencySymbol,
  settings,
  onSettingsChange,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-start gap-4">
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
      {settings && onSettingsChange && (
        <SettingsDialog
          settings={settings}
          onSettingsChange={onSettingsChange}
        />
      )}
    </div>
  );
}
