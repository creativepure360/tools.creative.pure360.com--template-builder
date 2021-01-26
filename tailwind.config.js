module.exports = {
  purge: {
    content: [
      "./components/**/*.js",
      "./components/**/**/*.js",
      "./pages/**/*.js",
    ],
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "floss-pink": "#FF00FF",
        "pavilion-purple": "#65008A",
        "level-green": "#00FF00",
        "regency-green": "#005533",
        "lanes-red": "#FC3D43",
        "ron-burgundy": "#550022",
        "sky-blue": "#00DAFF",
        "channel-blue": "#2D2E82",
        "sunrise-yellow": "#FFB200",
        "sunset-red": "#CD0600",
      },
      fontFamily: {
        "avant-garde-bold": ["Avant Garde Pro Bold", "sans-serif"],
        "proxima-regular": ["Proxima Nova Regular", "sans-serif"],
        "proxima-bold": ["Proxima Nova Bold", "sans-serif"],
      },
      boxShadow: {
        full: "0 0 15px 0 rgba(0,0,0,0.1)",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      scale: {
        30: '0.3',
        40: '0.4',
      }
    },
    outline: {
      pink: "2px solid #FF00FF",
    },
  },
  variants: {
    extend: {
      outline: ["hover"],
    },
  },
  plugins: [],
};
