const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/pages/**/*.{js,jsx,ts,tsx}", "./src/shared/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "3xl": "2000px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
