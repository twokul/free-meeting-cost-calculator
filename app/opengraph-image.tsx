import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Free Meeting Cost Calculator - Time is Money";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAFAFA",
        backgroundImage:
          "linear-gradient(to bottom right, #FAFAFA 0%, #F5F5F5 100%)",
      }}
    >
      {/* Calculator icon */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
          borderRadius: 16,
          padding: "24px 32px",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#22C55E",
          }}
        >
          $4,280
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#A3A3A3",
            marginTop: 4,
          }}
        >
          this month in meetings
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#171717",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        Free Meeting Cost Calculator
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 28,
          color: "#525252",
          marginTop: 20,
        }}
      >
        Time is Money. Calculate & Save!
      </div>

      {/* Domain */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 20,
          color: "#737373",
        }}
      >
        free-meeting-cost-calculator.com
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: "#171717",
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
