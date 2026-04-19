/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0faf2',
          100: '#dbf0de',
          200: '#b7e1be',
          300: '#8acb96',
          400: '#4fae66',
          500: '#00853F',
          600: '#006f33',
          700: '#005a2b',
          800: '#004522',
          900: '#00331a',
        },
        sun: {
          50:  '#fdf8e6',
          100: '#fbedba',
          300: '#f3d373',
          500: '#E8B923',
          600: '#c79b1b',
          700: '#946f12',
        },
        clinic: {
          50:  '#fef2f2',
          100: '#fde3e4',
          500: '#E31B23',
          600: '#c21520',
          700: '#9a1018',
        },
        sand: '#faf7f0',
        paper: '#ffffff',
        ink: {
          500: '#64748b',
          700: '#334155',
          900: '#0c1116',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(12, 17, 22, 0.04), 0 1px 3px rgba(12, 17, 22, 0.02)',
        hover: '0 4px 12px rgba(0, 133, 63, 0.08)',
      },
    },
  },
  plugins: [],
}
