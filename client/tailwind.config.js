
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        'user': '#A4CF5F',
        'doctor': '#3854E9'
      },
    },
  },
  plugins: [require("daisyui")],
}
