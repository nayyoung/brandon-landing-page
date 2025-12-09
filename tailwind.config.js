/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#c27c4b', // Primary Copper
          600: '#a65d35',
          700: '#8a482d',
          800: '#6e3926',
          900: '#562f22',
        },
        charcoal: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1c1c1c',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}

