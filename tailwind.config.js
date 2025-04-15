/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        stext: "#B0B9D1",
        bg: "#F5EFDD",
        mainbg: "#EB9D32",
        sborder: "#DF7D36",
        accent1: "#3773A8",
        accent1hover: "#244371",
        accent2: "#D74533",
        accent2hover: "#972C29",
      },
    },
  },
  plugins: [],
};
