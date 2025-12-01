import { Metadata } from "next";
import { Button } from "@/components/ui/button";
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

  const title = `${qty}x ${item} — Free Meeting Cost Calculator`;
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
    <div className="min-h-screen bg-white text-neutral-950 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Card preview */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 space-y-4">
          <div className="text-7xl">{icon}</div>
          <div className="text-3xl font-bold">
            <span className="text-green-600">{qty}x</span> {item}
          </div>
          <div className="text-neutral-500">
            ${Number(cost).toLocaleString()} worth of meetings
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <p className="text-neutral-600">See what your meetings really cost</p>
          <Button
            asChild
            size="lg"
            className="bg-neutral-900 text-white hover:bg-neutral-800 font-semibold"
          >
            <Link href="/cost">Try the Calculator</Link>
          </Button>
        </div>

        {/* Branding */}
        <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm">
          Free Meeting Cost Calculator
        </div>
      </div>
    </div>
  );
}
