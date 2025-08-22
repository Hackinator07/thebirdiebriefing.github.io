/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f3f5',
          100: '#efe3ef',
          200: '#dfc7df',
          300: '#c89dc9',
          400: '#aa6bab',
          500: '#ad345a',
          600: '#8c2a48',
          700: '#70223a',
          800: '#553756',
          900: '#483048',
        },
        secondary: {
          50: '#f6f7f3',
          100: '#eaeee3',
          200: '#d7dcc9',
          300: '#bbc5a7',
          400: '#9bab84',
          500: '#355743',
          600: '#5a5b3d',
          700: '#4a4a32',
          800: '#3d3e2a',
          900: '#343427',
        },
        golden: {
          50: '#fefbf0',
          100: '#fdf5d8',
          200: '#fae9b1',
          300: '#f6d980',
          400: '#f1c54d',
          500: '#D1A137',
          600: '#b8861a',
          700: '#936816',
          800: '#795218',
          900: '#67441a',
        },
        orange: {
          50: '#fef5f2',
          100: '#fde8e0',
          200: '#fbd4c7',
          300: '#f7b8a0',
          400: '#f2936c',
          500: '#DD5726',
          600: '#c7471d',
          700: '#a5381a',
          800: '#86311c',
          900: '#6e2d1b',
        },
        cream: {
          50: '#FFFBEC',
          100: '#fff8dc',
          200: '#fff0b8',
          300: '#ffe584',
          400: '#ffd54f',
          500: '#ffc107',
          600: '#ff9800',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(139, 90, 140, 0.1), 0 2px 4px -1px rgba(139, 90, 140, 0.06)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },

    },
  },
  plugins: [],
}
