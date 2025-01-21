import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";

export default {
  // CSS Build Configuration
  css: {
    input: "src/main.css",
    output: "dist/style.min.css",
    plugins: [postcssImport(), tailwindcss(), autoprefixer()],
  },
};
