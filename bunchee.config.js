import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";

export default {
  input: "./src/main.css",
  output: [{ file: "dist/index.css", format: "es" }],
  plugins: [
    postcss({
      plugins: [postcssImport(), tailwindcss(), autoprefixer()],
      extract: true,
      minimize: true,
    }),
  ],
};
