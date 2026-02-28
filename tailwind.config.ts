import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        palette: {
          dark: '#1F1C1C',
          white: '#FEFEFE',
          olive: '#7B7557',
          sage: '#69AC7C',
          grey: '#D9D9D9',
          cream: '#FFF6EF',
          brown: '#59543E',
        },
        workflow: {
          green: '#69AC7C',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        workflow: '0.75rem',
        'workflow-lg': '1rem',
      },
    },
  },
  plugins: [],
} satisfies Config
