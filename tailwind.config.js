module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'light-green-recoverly': '#ABE362',
        'light-green-matching-1' : '#e3db62',
        'light-green-matching-2' : '#6be362',
        'tint-background': '#263b0b',
        'dark-blue-recoverly': '#002570'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
