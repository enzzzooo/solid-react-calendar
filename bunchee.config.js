import postcss from "postcss";
export default {
  input: "./src/main.css",
  output: [{ file: "dist/index.css", format: "es" }],
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
};
