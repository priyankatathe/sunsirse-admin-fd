/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dm: ['"DM Sans"', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
        rubik: ['"Rubik Doodle Shadow"', 'system-ui'],
      },
    },
  },
   plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

