// bunchee.config.js
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default {
  input: "src/main.css",
  output: [{ file: "dist/index.css", format: "es" }],
  plugins: [
    {
      name: "css-minification",
      async transform({ content }) {
        const result = await cssnano.process(content, { from: undefined });
        return { code: result.css };
      },
    },
  ],
};
