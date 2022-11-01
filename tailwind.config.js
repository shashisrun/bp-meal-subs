/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   daisyui: {
//     darkTheme: "darktheme",
//     themes: [
//       {
//         lighttheme: {
//           "primary": "#34be70",
//           "secondary": "#b8efd1",
//           "accent": "#e3292a",
//           "neutral": "#FFF1F1",
//           "base-100": "#fdffff",
//           "base-200": "#f6f7fb",
//           "info": "#3ABFF8",
//           "success": "#36D399",
//           "warning": "#FBBD23",
//           "error": "#F87272",
//         },
//         darktheme: {
//           "primary": "#29EC57",
//           "secondary": "#1C4836",
//           "accent": "#4CD930",
//           "neutral": "#0F110E",
//           "base-100": "#0E1F0C",
//           "base-200": "#071207",
//           "info": "#3ABFF8",
//           "success": "#36D399",
//           "warning": "#FBBD23",
//           "error": "#F87272",
//         },
//       },
//     ],
//   },
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
// }
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        lighttheme: {
          "primary": "#34be70",
          "secondary": "#b8efd1",
          "accent": "#e3292a",
          "neutral": "#FFF1F1",
          "base-100": "#fdffff",
          "base-200": "#f6f7fb",
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
