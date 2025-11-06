/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        card: "hsl(var(--card))",
        stroke: "hsl(var(--stroke))",
        text: "hsl(var(--text))",
        mute: "hsl(var(--mute))",
        brand: "hsl(var(--brand))"
      },
      borderRadius: { xl: "16px", "2xl": "20px" }
    }
  },
  plugins: []
};
