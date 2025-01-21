// /workspaces/solid-react-calendar/bunchee.config.js
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const config = [
  // CSS Build Configuration
  {
    input: "src/styles.css",
    output: "dist/style.min.css",
    plugins: [
      postcss({
        plugins: [tailwindcss(), autoprefixer()],
        minimize: true,
      }),
    ],
  },

  // JS/TS Build Configuration
  {
    input: "src/index.ts",
    output: "dist/bundle.js",
    plugins: [
      // Add necessary Bunchee plugins here
    ],
  },
];

export default config;
