import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./icons/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.5rem",
        sm: "3rem",
       
      
       
      },
    },
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, #B96A00 0%, #AF8901 51%, #E1BC00 100%)",
      },
      backgroundSize: {
        "70%": "70%",
      },
      colors: {
        primary: {
          400: "#48B2E2",
          500: "#2873C9",
          600: "#0A316A",
          700: "#0A2041",
          800: "#3F83F8",
          900: "#1C64F2",
        },
        gray: {
          550: "#EFF0F3",
          750:"#545151",
          450:"#8D8888",
          
        },
      },

      maxWidth: {
        "3.5xl": "50rem",
      },
    },
  },
  plugins: [],
};
export default config;
