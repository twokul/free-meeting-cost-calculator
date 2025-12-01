import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import Link from "next/link";

interface SharePageProps {
  searchParams: Promise<{
    item?: string;
    icon?: string;
    qty?: string;
    cost?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: SharePageProps): Promise<Metadata> {
  const params = await searchParams;
  const item = params.item || "Meeting Cost";
  const icon = params.icon || "💸";
  const qty = params.qty || "1";
  const cost = params.cost || "0";

  const title = `${qty}× ${item} — MeetingCost`;
  const description = `My meetings cost $${Number(
    cost,
  ).toLocaleString()} — enough for ${qty} ${item}! Calculate yours.`;

  const ogUrl = new URL(
    "/api/og",
    process.env.NEXT_PUBLIC_BASE_URL || "https://meetingcost.com",
  );
  ogUrl.searchParams.set("item", item);
  ogUrl.searchParams.set("icon", icon);
  ogUrl.searchParams.set("qty", qty);
  ogUrl.searchParams.set("cost", cost);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${qty}× ${item}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function SharePage({ searchParams }: SharePageProps) {
  const params = await searchParams;
  const item = params.item || "Meeting Cost";
  const icon = params.icon || "💸";
  const qty = params.qty || "1";
  const cost = params.cost || "0";

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Card preview */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
          <div className="text-7xl">{icon}</div>
          <div className="text-3xl font-bold">
            <span className="text-green-500">{qty}×</span> {item}
          </div>
          <div className="text-white/60">
            ${Number(cost).toLocaleString()} worth of meetings
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <p className="text-white/70">See what your meetings really cost</p>
          <Button
            asChild
            size="lg"
            className="bg-white text-neutral-900 hover:bg-neutral-200 font-semibold"
          >
            <Link href="/demo">
              <DollarSign className="mr-2 h-5 w-5" />
              Try the Calculator
            </Link>
          </Button>
        </div>

        {/* Branding */}
        <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
          <DollarSign className="h-4 w-4 text-green-500" />
          MeetingCost Calculator
        </div>
      </div>
    </div>
  );
}
