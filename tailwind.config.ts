import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'italinea-blue': '#164187',
        'italinea-nude': '#FF9C73',
        'italinea-nude-light': '#FFD0B9',
      },
      fontFamily: {
        'filson': ['var(--font-filson)', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
