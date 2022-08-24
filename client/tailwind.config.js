module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          25: "#E9F0FF",
          50: "#E3F4FC",
          150: "#12E2EF",
          250: "#13AAFF",
          350: "#1E90FF",
          450: "#2268FE",
        },
        gray: {
          150: "#FCFCFC",
          250: "#F8FAFB",
          350: "#F2F3F5",
          450: "#ACBBC2",
          550: "#94A6B0",
          650: "#45758F",
          750: "#2D5063",
          850: "#202020",
        },
        green: {
          150: "#E9FFFD",
          550: "#039487",
        },
        red: {
          150: "#FFE4EA",
          550: "#DC143C",
        },
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'xxs': '10px',
        '4.5xl': '40px',
      },
      padding: {
        '120': '30rem',
      },
      borderRadius: {
        '4xl': '32px',
      },
      borderWidth: {
        '1/2': '0.5px',
        '1': '1px',
      },
      dropShadow: {
        'blue': ['0 20px 13px rgb(18 226 239 / 0.03)', '0 8px 5px rgb(18 226 239  / 0.08)'],
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [],
}