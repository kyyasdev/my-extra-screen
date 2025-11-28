/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.2)',
          },
        },
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
        'pulse-delay-1': 'pulse 2s ease-in-out infinite 0.5s',
        'pulse-delay-2': 'pulse 2s ease-in-out infinite 1s',
      },
    },
  },
  plugins: [],
};
