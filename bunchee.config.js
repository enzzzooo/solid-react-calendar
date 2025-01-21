import tailwindcss from "tailwindcss";
const tailwindConfig = require("./tailwind.config.js");

export default {
  // CSS Build Configuration
  css: {
    input: "src/main.css",
    output: "dist/style.min.css",
    plugins: [
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
        plugins: [tailwindcss(tailwindConfig)],
      }),
    ],
  },
};
