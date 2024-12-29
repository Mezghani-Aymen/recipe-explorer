import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondry: "var(--secondry)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        customText: "var(--customText)",
      },
    },
  },
  plugins: [],
  darkMode:'class'
} satisfies Config;
