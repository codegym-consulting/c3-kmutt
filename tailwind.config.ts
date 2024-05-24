/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'gray-1': '#f9f9f9',
        'gray-2': '#f2f2f2',
        'gray-3': '#e9e9e9',
        'gray-4': '#d9d9d9',
        'gray-5': '#b5b5b5',
        'gray-6': '#959595',
        'gray-7': '#6d6d6d',
        'gray-8': '#5a5a5a',
        'gray-9': '#3b3b3b',
        'gray-10': '#1b1b1b',
        'dark-theme': '#262A37',
        'chrysler-blue': '#5549FF',
      },
      screens: {
        mobile: '500px',
        container: '83rem',
      },
    },
  },
  plugins: [],
}
