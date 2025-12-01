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

function shareToX(item: PayForXItem) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const totalCost = item.quantity * item.cost;

  const shareUrl = new URL("/share", baseUrl);
  shareUrl.searchParams.set("item", item.name);
  shareUrl.searchParams.set("icon", item.icon);
  shareUrl.searchParams.set("qty", item.quantity.toString());
  shareUrl.searchParams.set("cost", totalCost.toString());

  const tweetText = `My meetings cost $${totalCost.toLocaleString()} — enough for ${
    item.quantity
  } ${item.name}! ${item.icon}\n\nCalculate yours:`;

  const twitterUrl = new URL("https://twitter.com/intent/tweet");
  twitterUrl.searchParams.set("text", tweetText);
  twitterUrl.searchParams.set("url", shareUrl.toString());

  window.open(twitterUrl.toString(), "_blank", "width=550,height=420");
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => shareToX(item)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900"
                        title="Share on X"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="currentColor"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </button>
                      <div className="font-mono font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs md:text-sm shrink-0">
                        {currencySymbol}
                        {(item.quantity * item.cost).toLocaleString()}
                      </div>
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
