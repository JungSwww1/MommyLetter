
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        'user': '#FFDF6D',
        'doctor': '#3854E9',
        'MenuColor':"#533C00",
        'pointColor':"#533C00",
      },
      boxShadow: {
        'custom-inner': 'inset 0 5px 5px 2px rgba(0, 0, 0, 0.2)',
        'custom-outer': '3px 3px 10px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require("daisyui")],
}
