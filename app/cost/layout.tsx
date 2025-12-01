import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meeting Cost Calculator Demo",
  description:
    "See how much meetings cost for different roles. Try the demo with Software Engineers, Product Managers, Directors, and more.",
  openGraph: {
    title: "Meeting Cost Calculator Demo",
    description:
      "See how much meetings cost for different roles. Try the demo with Software Engineers, Product Managers, Directors, and more.",
  },
};

export default function CostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
