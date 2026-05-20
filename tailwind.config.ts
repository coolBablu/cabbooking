import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "var(--font-inter)", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "var(--font-inter)", "sans-serif"],
        general: ["var(--font-general)", "var(--font-inter)", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f5f7fb",
          100: "#e5e9f2",
          200: "#c9d2e3",
          300: "#9aa6c2",
          400: "#5f6c8a",
          500: "#3a4566",
          600: "#222b48",
          700: "#161d33",
          800: "#0d1325",
          900: "#070b18",
          950: "#03060f",
        },
        electric: {
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#1d4ed8",
          700: "#1e3a8a",
        },
        sunny: {
          300: "#fde68a",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
        },
        neon: {
          pink: "#ff3df0",
          purple: "#8b5cf6",
          cyan: "#22d3ee",
          lime: "#a3e635",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.35), transparent 60%)",
        "hero-gradient":
          "linear-gradient(135deg, #070b18 0%, #0d1325 40%, #1e3a8a 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59,130,246,0.45)",
        "glow-yellow": "0 0 40px rgba(250,204,21,0.45)",
        soft: "0 20px 60px -20px rgba(0,0,0,0.45)",
        ring: "0 0 0 1px rgba(255,255,255,0.08), 0 25px 60px -20px rgba(0,0,0,0.6)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 5s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-pan": "gradient-pan 14s ease infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
