/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      boxShadow: {
        cmsPreviewFrame: '0 0 0 64px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
