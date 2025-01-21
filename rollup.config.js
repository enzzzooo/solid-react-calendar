import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/main.css",
    output: [{ file: "dist/index.css", format: "es" }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
];
