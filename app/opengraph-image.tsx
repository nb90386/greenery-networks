import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Greenery Networks · live flowering starter plants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Georgia, serif",
          background:
            "radial-gradient(60% 60% at 80% 0%, #E8F0E3 0%, #FFFDF8 60%), linear-gradient(180deg, #FFFDF8 0%, #E8F0E3 100%)",
          color: "#1E3A2B",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M16 30 V14" stroke="#1E3A2B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M16 18 C 10 18, 5.5 15, 5 9.5 C 10 9, 14.5 12, 16 18 Z" fill="#1E3A2B" opacity="0.9" />
            <path d="M16 15 C 22.5 15, 27 11.5, 27.5 5 C 22 5.5, 17.5 8.5, 16 15 Z" fill="#1E3A2B" />
          </svg>
          <div style={{ fontSize: 34, letterSpacing: "-0.01em" }}>
            Greenery <i style={{ fontWeight: 300 }}>Networks</i>
          </div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 400,
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>A garden,</span>
          <span>delivered in</span>
          <span style={{ fontStyle: "italic", color: "#4A7A45", fontWeight: 300 }}>
            four inch pots.
          </span>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#4A7A45",
            display: "flex",
            gap: 20,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>117 flowering plants</span>
          <span>·</span>
          <span>ships from california</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
