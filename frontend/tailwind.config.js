/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'telegram-blue': '#5B9BD5',
        'telegram-header': '#517DA2',
        'telegram-green': '#EEFFDE',
        'telegram-check': '#4CAF50',
        'chat-bg-start': '#D4E7A5',
        'chat-bg-end': '#9FCFB2',
      },
      fontFamily: {
        'telegram': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}