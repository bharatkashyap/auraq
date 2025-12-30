/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'auraq-dark': '#1e1d21', // Main night background
        'auraq-black': '#000000', // Wrapper/Header night
        // Adjusted accent for better contrast in dark mode (slightly lighter)
        'auraq-accent': '#ff5e84', 
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            fontFamily: theme('fontFamily.serif'),
            
            // Headings
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.serif'),
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            'a': {
              color: theme('colors.auraq-accent'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.gray.900'),
              },
            },
          },
        },
        // Dark Mode Overrides (applied when .prose-invert is used)
        invert: {
           css: {
             color: theme('colors.gray.300'),
             'h1, h2, h3, h4': {
                color: theme('colors.gray.100'),
             },
             'a': {
                color: theme('colors.auraq-accent'),
                '&:hover': {
                  color: theme('colors.white'),
                },
             },
             'strong': {
                color: theme('colors.white'),
             },
             'blockquote': {
                borderLeftColor: theme('colors.auraq-accent'),
                color: theme('colors.gray.400'),
             }
           }
        }
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
