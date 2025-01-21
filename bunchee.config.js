// bunchee.config.js
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";

export default {
    input: "src/styles/main.css",
    output: [{ file: "dist/index.css", format: "es" }],
    plugins: [
        postcss({
            extract: true,
            minimize: true,
        }),
    ],
}
