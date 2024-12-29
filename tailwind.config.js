/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          500: '#EF4444',
        },
        blue: {
          500: '#3B82F6',
        },
        yellow: {
          500: '#EAB308',
        },
        green: {
          500: '#22C55E',
          800: '#166534',
        },
        purple: {
          500: '#A855F7',
        },
        orange: {
          500: '#F97316',
        },
        pink: {
          500: '#EC4899',
        },
        brown: {
          500: '#92400E',
        },
        teal: {
          500: '#14B8A6',
        },
        violet: {
          500: '#8B5CF6',
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-red-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-brown-500',
    'bg-teal-500',
    'bg-violet-500',
  ],
};