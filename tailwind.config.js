/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0A2A5E',
        'brand-orange': '#FF6B00',
        'tricolor-saffron': '#FF9933',
        'tricolor-white': '#FFFFFF',
        'tricolor-green': '#138808',
        'bg-cream': '#FAF6EE',
        'bg-dark-teal': '#1B4A4A',
        'text-dark': '#1A1A2E',
        'text-muted': '#5A5A7A',
        'accent-gold': '#D4AF37',
        'stamp-border': '#C8B89A',
      },
      fontFamily: {
        sans: ['"Poppins"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Dancing Script"', 'cursive'],
        cinzel: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'stamp': '2px 2px 6px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
