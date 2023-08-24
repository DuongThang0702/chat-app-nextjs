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
        title: ["GT Super Txt Trial", "sans-serif"],
        main: ["Poppins", "sans-serif"],
        header: ["IBM Plex Sans", "sans-serif"],
        read: ["Roboto Slab", "serif"],
        vollkorm: ["Vollkorn", "serif"],
      },
      colors: {
        menu: "rgba(120, 120, 120, 0.5)",
        model: "rgba(36, 37, 38, 0.5)",
        main: "#242526",
        whiteOpacity: "#3A3B3C",
        whiteOpacityHover: "#8a8484",
      },
    },
  },
  plugins: [],
};
export default config;
