/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    darkTheme: "darktheme",
    themes: [
      {
        lighttheme: {
          "primary": "#29EC57",
          "secondary": "#75E963",
          "accent": "#4CD930",
          "neutral": "#FFF1F1",
          "base-100": "#F4F4F4",
          "base-200": "#EEEEEE",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
        darktheme: {
          "primary": "#29EC57",
          "secondary": "#1C4836",
          "accent": "#4CD930",
          "neutral": "#0F110E",
          "base-100": "#0E1F0C",
          "base-200": "#071207",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
