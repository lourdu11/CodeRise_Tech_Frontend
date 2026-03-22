/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#2563EB",
          purple: "#7C3AED",
        },
        dark: "#0F172A",
        accent: "#8B5CF6",
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #2563EB, #7C3AED)',
      }
    },
  },
  plugins: [],
}
