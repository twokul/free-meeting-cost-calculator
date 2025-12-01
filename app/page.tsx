import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 flex flex-col">
      <header className="p-4 md:p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
          <DollarSign className="text-green-600 h-5 w-5 md:h-6 md:w-6" />
          MeetingCost
        </div>
        <nav>
          {/* <Link href="/login" className="text-sm hover:underline">Login</Link> */}
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 md:p-6 gap-6 md:gap-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-transparent">
            Stop Burning Money on Meetings
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
            <Link href="/demo">View Demo</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-16 text-left w-full">
          <Card className="bg-white border-neutral-200 text-neutral-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Real Costs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Estimate the true cost of every meeting based on attendee count
                and duration.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-neutral-200 text-neutral-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Meeting Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Get a rating for your meeting structure (duration & size) and
                tips to improve.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-neutral-200 text-neutral-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Calendar Cleanup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Identify the most expensive recurring meetings that should be
                emails.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="p-4 md:p-6 text-center text-neutral-500 text-xs md:text-sm">
        <p>
          © {new Date().getFullYear()} Meeting Cost Calculator. Processed
          locally. No data stored.
        </p>
      </footer>
    </div>
  );
}
