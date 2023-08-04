/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        pro: 'url("/pro.png")',
        personal: 'url("/personal.png")',
        academic: 'url("/academic.png")',
      },
      spacing: {
        header: '64px',
      },
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
