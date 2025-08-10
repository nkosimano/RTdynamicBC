/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Table 1: The Core Palette
        'primary-navy': '#0A2342',
        'secondary-teal': '#00A3A1',
        'accent-ochre': '#E88D14',
        'text-charcoal': '#1A1A1A',
        'background-offwhite': '#F7F7FA',

        // Table 3: Semantic Colour Usage
        'semantic-success': '#28A745',
        'semantic-warning': '#E88D14',
        'semantic-danger': '#DC3545',
        'semantic-info': '#0A2342',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(10, 35, 66, 0.1), 0 2px 4px -1px rgba(10, 35, 66, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(10, 35, 66, 0.1), 0 4px 6px -2px rgba(10, 35, 66, 0.05)',
      },
    },
  },
  plugins: [],
};