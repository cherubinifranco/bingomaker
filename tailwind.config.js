/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				stext: "#B0B9D1",
				bg: "#28426B",
				mainbg: "#172446",
				sborder: "#94A7CD",
				accent1: "#F87633",
				accent2: "#FFC102",
				accent3: "#01AFCC",
			}
		},
	},
	plugins: [],
}

