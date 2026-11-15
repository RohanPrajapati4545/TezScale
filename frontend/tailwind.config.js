/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        blue: {
          50: '#f0f9ff',
          100: '#e0f4ff',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00A3E0',
          600: '#00A3E0', // Drone.io Signature Cyan
          700: '#008bc0', // Drone.io Hover
          800: '#007ba8', // Drone.io Active
          900: '#0b192c', // Drone.io Deep Navy
        },
        drone: {
          cyan: '#00A3E0',
          cyanHover: '#008bc0',
          cyanLight: '#e0f4ff',
          navy: '#0b192c',
          dark: '#08101e',
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f4ff',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00A3E0', // Drone.io Signature Cyan
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0b192c',
        }
      }
    },
  },
  plugins: [],
}
