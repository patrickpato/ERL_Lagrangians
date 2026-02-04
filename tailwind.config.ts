import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cd: {
          bg: "var(--cd-bg)",
          surface: "var(--cd-surface)",
          text: "var(--cd-text)",
          muted: "var(--cd-muted)",
          accent: "var(--cd-accent)",
          "accent-2": "var(--cd-accent-2)",
          success: "var(--cd-success)",
          warning: "var(--cd-warning)",
          danger: "var(--cd-danger)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 181, 216, 0.25)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
