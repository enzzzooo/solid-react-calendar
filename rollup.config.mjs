// /workspaces/solid-react-calendar/rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
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
      dir: "dist/cjs", // Output directory for CJS modules
      format: "cjs",
      sourcemap: true, // Enable sourcemaps
      preserveModules: true, // Preserves module structure
      preserveModulesRoot: "src", // Add this line
      exports: "named",
    },
    plugins: [
      json(), // Allows Rollup to import JSON files
      resolve(), // Locates modules using the Node resolution algorithm
      commonjs(), // Converts CommonJS modules to ES6
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
        clean: true,
        sourceMap: true, // Ensure TypeScript plugin generates sourcemaps
        inlineSources: true,
      }), // Compiles TypeScript with rollup-plugin-typescript2
      postcss({
        plugins: [tailwindcss(), autoprefixer()],
        modules: false, // Disable CSS Modules
        extract: "style.min.css", // Extract CSS to a separate file
        minimize: true, // Minify the CSS
        sourceMap: true, // Enable sourcemaps for PostCSS
      }), // Processes CSS with PostCSS
      preserveDirectives(), // Preserves 'use client' and 'use server'
      terser({
        compress: { directives: false }, // Disable directive-specific compressions
      }), // Minifies the JavaScript
    ],
    external: ["react", "react-dom"], // Exclude peer dependencies from the bundle
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
      dir: "dist/esm", // Output directory for ESM modules
      format: "esm",
      sourcemap: true, // Enable sourcemaps
      preserveModules: true, // Preserves module structure
      preserveModulesRoot: "src", // Add this line
    },
    plugins: [
      json(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
        clean: true,
        sourceMap: true, // Ensure TypeScript plugin generates sourcemaps
        inlineSources: true,
      }),
      postcss({
        plugins: [tailwindcss(), autoprefixer()],
        modules: false,
        extract: "style.min.css",
        minimize: true,
        sourceMap: true, // Enable sourcemaps for PostCSS
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
    external: [/\.css$/], // Exclude CSS imports
  },
];
