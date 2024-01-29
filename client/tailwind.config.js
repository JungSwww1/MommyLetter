
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        'user': '#FFDF6D',
        'doctor': '#3854E9',
        'MenuColor':"#533C00",
      },
    },
  },
  plugins: [require("daisyui")],
}
