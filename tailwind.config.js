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
          50: '#f8f7f8',
          100: '#f0eef0',
          200: '#e1dde2',
          300: '#c9c2c8',
          400: '#a99fa7',
          500: '#645963',
          600: '#5a4f58',
          700: '#4c424a',
          800: '#3f373e',
          900: '#352f34',
        },
        secondary: {
          50: '#f8f7f9',
          100: '#f0eef2',
          200: '#e1dde6',
          300: '#c9c2d0',
          400: '#a99fb5',
          500: '#67405C',
          600: '#5d3952',
          700: '#4e3045',
          800: '#402738',
          900: '#35212e',
        },
        accent: {
          50: '#f7f8f7',
          100: '#eef0ee',
          200: '#dde2dd',
          300: '#c2c8c2',
          400: '#9fa79f',
          500: '#596460',
          600: '#4f5a56',
          700: '#424c48',
          800: '#373f3b',
          900: '#2f3532',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
        'brand': '0 4px 6px -1px rgba(100, 89, 99, 0.1), 0 2px 4px -1px rgba(100, 89, 99, 0.06)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #645963 0%, #67405C 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      },
    },
  },
  plugins: [],
}
