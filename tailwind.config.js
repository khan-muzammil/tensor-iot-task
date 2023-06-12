/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#1F2937",
        secondary: "#4B5563",
        warning: "#981B1C",
        success: "#03543F",
        pending: "#92400F",
      },
      backgroundColor: {
        primary: "#F4F5F7",
        secondary: "#E4E4E7",
        warning: "#FDE2E1",
        success: "#DEF7EC",
        pending: "#FEF3C7",
      },
      borderColor: {
        primary: "#E4E4E7",
      },
    },
  },
  plugins: [],
};
