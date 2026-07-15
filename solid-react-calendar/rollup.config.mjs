import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import preserveDirectives from "rollup-plugin-preserve-directives";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default [
  // 📦 CommonJS (CJS) Build Configuration
  {
    input: "src/index.ts",
    output: {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
    },
    plugins: [
      json(),
      resolve({
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      }),
      typescript({
        tsconfig: false,
        compilerOptions: {
          target: "ES6",
          module: "ESNext",
          jsx: "react-jsx",
          esModuleInterop: true,
          moduleResolution: "bundler",
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          sourceMap: true,
          resolveJsonModule: true,
          declaration: false,
        },
      }),
      commonjs(),
      postcss({
        plugins: [tailwindcss(), autoprefixer()],
        modules: false,
        extract: "index.min.css",
        minimize: true,
        sourceMap: true,
      }),
      preserveDirectives(),
      terser({
        compress: { directives: false },
      }),
    ],
    external: ["react", "react-dom"],
    onwarn(warning, warn) {
      if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
        warn(warning);
      }
    },
  },

  // 📦 ES Module (ESM) Build Configuration
  {
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [
      json(),
      resolve({
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      }),
      typescript({
        tsconfig: false,
        compilerOptions: {
          target: "ES6",
          module: "ESNext",
          jsx: "react-jsx",
          esModuleInterop: true,
          moduleResolution: "bundler",
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          sourceMap: true,
          resolveJsonModule: true,
          declaration: false,
        },
      }),
      commonjs(),
      postcss({
        plugins: [tailwindcss(), autoprefixer()],
        modules: false,
        extract: "index.min.css",
        minimize: true,
        sourceMap: true,
      }),
      preserveDirectives(),
      terser({
        compress: { directives: false },
      }),
    ],
    external: ["react", "react-dom"],
    onwarn(warning, warn) {
      if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
        warn(warning);
      }
    },
  },

  // 📝 Type Definitions Build Configuration
  {
    input: "src/index.ts",
    output: { file: "dist/index.d.ts", format: "es" },
    plugins: [dts()],
    external: [/\.css$/],
  },
];
