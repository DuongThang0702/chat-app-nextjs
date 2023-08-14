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
    },
  },
  plugins: [],
};
export default config;
