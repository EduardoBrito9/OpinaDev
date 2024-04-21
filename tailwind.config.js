/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        modalColor: "#252525",
        grayText: "#A8A29E",
      },
      animation: {
        upup: "upup 1s infinite",
        renderAnimation: "renderAnimation 1s forwards",
        renderAnimationModal: " renderAnimationModal 0.2s forwards",
       
      },
    },
  },
  plugins: [],
};
