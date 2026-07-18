import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nidhin M — I fix the query nobody else noticed";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LIME = "#CDFF14";
const BLACK = "#0a0a0a";
const GRAY = "#8a8a8a";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BLACK,
          padding: "48px 56px",
          fontFamily: "sans-serif",
        }}
      >
        {/* masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `2px solid #2a2a2a`,
            paddingBottom: 20,
            fontSize: 22,
            letterSpacing: 4,
            color: GRAY,
          }}
        >
          <span style={{ color: "#f5f5f5", fontWeight: 700 }}>[ NIDHIN_M ]</span>
          <span>SOFTWARE_ENGINEER // BACKEND·FULLSTACK</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10, color: LIME }}>
            <span style={{ width: 14, height: 14, backgroundColor: LIME, display: "flex" }} />
            ONLINE
          </span>
        </div>

        {/* name monument + stamp */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 170,
              lineHeight: 1,
              letterSpacing: -3,
              color: "#f5f5f5",
            }}
          >
            NIDHIN M
          </span>
          <span
            style={{
              display: "flex",
              transform: "rotate(-1.5deg)",
              backgroundColor: LIME,
              color: BLACK,
              padding: "10px 24px",
              marginTop: -8,
              fontWeight: 800,
              fontSize: 40,
              letterSpacing: 0,
              border: `3px solid ${BLACK}`,
            }}
          >
            I FIX THE QUERY NOBODY ELSE NOTICED
          </span>
        </div>

        {/* footer strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid #2a2a2a`,
            paddingTop: 20,
            fontSize: 22,
            letterSpacing: 3,
          }}
        >
          <span style={{ color: GRAY }}>NODE.JS · TYPESCRIPT · MONGODB · GRAPHQL · AWS</span>
          <span style={{ color: LIME, fontWeight: 700 }}>nidhinm.vercel.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
