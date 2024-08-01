/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          darken: '#e3342f', // Replace with your specific red darken value
        },
      },
      backgroundImage: {
        'home-page-svg': "url('/wave-haikei.svg')",
        'waves-svg':"url('/wavesOpacity.svg')",
        'triangle-svg':"url('/layered-waves-haikei.svg')",
        'quiz-card-gradient': 'linear-gradient(180deg, #5e97d1 0%, #5993d0 100%)',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        dash: {
          '0%': {
            strokeDasharray: '422, 0',
            strokeDashoffset: '0',
          },
          '100%': {
            strokeDasharray: '15, 310',
            strokeDashoffset: '48',
          },
        },
      },
      animation: {
        float: 'float 0.7s ease-in-out',
        dash: 'dash 1.35s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
    },
  },
  plugins: [],
}

