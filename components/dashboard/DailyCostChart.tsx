"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DailyDataPoint {
  date: string;
  cost: number;
  count: number;
}

interface DailyCostChartProps {
  data: DailyDataPoint[];
}

const chartConfig = {
  cost: {
    label: "Cost",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DailyCostChart({ data }: DailyCostChartProps) {
  return (
    <Card>
      <CardHeader className="px-4 md:px-6">
        <CardTitle className="text-base md:text-lg">
          Daily Meeting Cost
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0 pr-2 md:pl-2 md:pr-6">
        <ChartContainer
          config={chartConfig}
          className="h-[200px] md:h-[300px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillCost" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-cost)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-cost)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                });
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="cost"
              type="natural"
              fill="url(#fillCost)"
              fillOpacity={0.4}
              stroke="var(--color-cost)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
