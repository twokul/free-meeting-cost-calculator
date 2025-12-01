import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the Free Meeting Cost Calculator. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-white text-neutral-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-neutral-500 hover:text-neutral-900 text-sm mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-3xl font-semibold mb-8">Privacy Policy</h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <p className="text-sm text-neutral-500">
            Last updated: November 30, 2025
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-neutral-900">Overview</h2>
            <p>
              Free Meeting Cost Calculator is designed with privacy in mind. We
              minimize data collection and process your calendar data locally in
              your browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-neutral-900">
              Data We Access
            </h2>
            <p>
              When you connect your Google Calendar, we request read-only access
              to your calendar events. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Event titles</li>
              <li>Event durations</li>
              <li>Number of attendees</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-neutral-900">
              How We Use Your Data
            </h2>
            <p>
              Your calendar data is processed entirely in your browser to
              calculate meeting costs. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Store your calendar data on our servers</li>
              <li>Share your data with third parties</li>
              <li>Use your data for advertising</li>
              <li>Track individual meeting content</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-neutral-900">
              Data Retention
            </h2>
            <p>
              We do not retain your calendar data. Once you close the browser or
              end your session, all processed data is cleared. No calendar
              information is stored in any database.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-neutral-900">
              Google OAuth
            </h2>
            <p>
              We use Google OAuth to authenticate and access your calendar. You
              can revoke access at any time through your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline hover:no-underline"
              >
                Google Account settings
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-medium text-neutral-900">Contact</h2>
            <p>
              If you have questions about this privacy policy, you can reach out
              on{" "}
              <a
                href="https://x.com/twokul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline hover:no-underline"
              >
                X (Twitter)
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
