/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#f1f2f4", // Add your custom color here
      },
      boxShadow: {
        "dark-xl": "0 8px 10px rgba(0, 0, 0, 1)", // Darker shadow
      },
    },
  },
  plugins: [],
};
