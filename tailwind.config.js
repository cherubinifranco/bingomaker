/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				stext: "#4C4052",
				mainbg: "#2C2B3E",
				secondarybg: "#1E1E2E"
			}
		},
	},
	plugins: [],
}

