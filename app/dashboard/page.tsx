import { Metadata } from "next";
import { fetchMeetingData } from "@/app/actions/calendar";
import DashboardWrapper from "./dashboard-wrapper";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Meeting Costs",
  description: "View your personalized meeting cost analysis.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  // Fetch 30 days of data by default
  const { meetings, error } = await fetchMeetingData(30);

  if (error === "Not authenticated") {
    redirect("/api/auth/google");
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading dashboard</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return <DashboardWrapper initialMeetings={meetings} />;
}
