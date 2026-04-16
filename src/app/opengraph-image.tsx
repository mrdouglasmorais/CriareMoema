import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} | ${siteConfig.titleSuffix}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(145deg, #0c0a09 0%, #1c1917 40%, #78350f 100%)",
          color: "#fafaf9",
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 6, textTransform: "uppercase", opacity: 0.75 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 16,
            letterSpacing: -2,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ fontSize: 22, marginTop: 24, maxWidth: 880, opacity: 0.88, lineHeight: 1.45 }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
