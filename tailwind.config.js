/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#040529',
          900: '#06073b',
          850: '#070947',
          800: '#0c1256',
          700: '#141c6f',
        },
        clinical: {
          blue: '#0284c7',
          'blue-dark': '#076694',
          'blue-hover': '#0369a1',
          cyan: '#38bdf8',
          'cyan-soft': '#dcf3f9',
          lavender: '#f8f7ff',
          'lavender-card': '#f2f0ff',
          'lavender-border': '#e2e0f5',
          referable: '#8b0000',
          'referable-bright': '#dc2626',
          'referable-soft': '#fca5a5',
          'review': '#f59e0b',
          'normal': '#16a34a',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'clinical': '0 2px 10px -2px rgba(9, 13, 46, 0.05), 0 1px 3px -1px rgba(9, 13, 46, 0.03)',
        'clinical-md': '0 4px 20px -3px rgba(9, 13, 46, 0.08), 0 2px 6px -2px rgba(9, 13, 46, 0.04)',
        'clinical-lg': '0 10px 30px -4px rgba(9, 13, 46, 0.1), 0 4px 10px -3px rgba(9, 13, 46, 0.05)',
      }
    },
  },
  plugins: [],
}
