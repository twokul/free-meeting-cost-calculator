import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const item = searchParams.get("item") || "Meeting Cost";
  const icon = searchParams.get("icon") || "💸";
  const qty = searchParams.get("qty") || "1";
  const cost = searchParams.get("cost") || "0";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)",
      }}
    >
      {/* Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          borderRadius: "32px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          gap: "24px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            fontSize: "120px",
            lineHeight: 1,
          }}
        >
          {icon}
        </div>

        {/* Quantity x Item */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "white",
            fontSize: "56px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              color: "#22c55e",
              fontWeight: 800,
            }}
          >
            {qty}×
          </span>
          <span>{item}</span>
        </div>

        {/* Cost */}
        <div
          style={{
            fontSize: "32px",
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: 500,
          }}
        >
          ${Number(cost).toLocaleString()} worth of meetings
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "absolute",
          bottom: "40px",
          color: "rgba(255, 255, 255, 0.4)",
          fontSize: "24px",
        }}
      >
        <span style={{ color: "#22c55e", fontSize: "28px" }}>$</span>
        <span>MeetingCost Calculator</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
