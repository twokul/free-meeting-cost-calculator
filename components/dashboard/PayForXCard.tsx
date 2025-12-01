"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayForXItem } from "@/lib/metrics";

interface PayForXCardProps {
  categorizedItems: Record<string, PayForXItem[]>;
  currencySymbol: string;
}

export function PayForXCard({
  categorizedItems,
  currencySymbol,
}: PayForXCardProps) {
  const categories = Object.keys(categorizedItems);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>What this could buy</CardTitle>
        <CardDescription>Alternative uses for this budget</CardDescription>
      </CardHeader>
      <CardContent className="px-3 md:px-6">
        {categories.length > 0 ? (
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="w-full h-auto flex-wrap justify-start gap-1 mb-4 bg-transparent p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="capitalize text-xs md:text-sm px-2 md:px-3 py-1.5 data-[state=active]:bg-neutral-900 data-[state=active]:text-white rounded-full"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((cat) => (
              <TabsContent
                key={cat}
                value={cat}
                className="space-y-2 md:space-y-3"
              >
                {categorizedItems[cat].map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between p-2 md:p-3 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all gap-2"
                  >
                    <div className="flex items-center gap-2 md:gap-4 min-w-0">
                      <div className="h-8 w-8 md:h-10 md:w-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm text-base md:text-xl border border-neutral-100">
                        {item.icon}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-semibold text-neutral-900 text-sm md:text-base truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] md:text-xs text-neutral-500 font-medium">
                          {item.quantity.toLocaleString()} units
                        </p>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs md:text-sm shrink-0">
                      {currencySymbol}
                      {(item.quantity * item.cost).toLocaleString()}
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Budget too low for comparisons
          </div>
        )}
      </CardContent>
    </Card>
  );
}
