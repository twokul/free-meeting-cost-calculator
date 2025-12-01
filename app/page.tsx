import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex-1 bg-white text-neutral-950 flex flex-col items-center justify-center text-center px-4 py-8 gap-6 md:gap-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900">
            Free Meeting Cost Calculator
          </h1>
          <p className="text-base md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Connect your calendar and instantly see how much your company spends
            on meetings. Find the waste, optimize your schedule, and save
            thousands.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <Button
            asChild
            size="lg"
            className="bg-neutral-900 text-white hover:bg-neutral-800 text-base md:text-lg h-12 px-6 md:px-8 w-full sm:w-auto"
          >
            <Link href="/api/auth/google">
              <Calendar className="mr-2 h-5 w-5" />
              Connect Google Calendar
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-base md:text-lg h-12 px-6 md:px-8 border-neutral-200 bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 w-full sm:w-auto"
          >
            <Link href="/cost">View Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
