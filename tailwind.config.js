/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#171914', clay: '#d48661', sage: '#9caf83' },
      fontFamily: { sans: ['Manrope', 'sans-serif'], mono: ['DM Mono', 'monospace'], display: ['Playfair Display', 'serif'] },
    },
  },
  plugins: [],
};
