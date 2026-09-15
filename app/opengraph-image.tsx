import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

/** L'aperçu affiché quand le lien est partagé — LinkedIn compris. */
export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#f5f5f3",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#6e6e6e", textTransform: "uppercase" }}>
          Développeur full-stack · Toulouse
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>
            Je transforme des idées
          </div>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>en produits.</div>
          <div style={{ display: "flex", width: 140, height: 5, background: "#e01a2b", marginTop: 36 }} />
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#a1a1a1" }}>
          Next.js · React · TypeScript · Python · FastAPI · PostgreSQL · Docker
        </div>
      </div>
    ),
    size,
  );
}
