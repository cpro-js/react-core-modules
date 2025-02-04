import { resolve } from "path";

import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

import packageJson from "./package.json";

export default defineConfig({
  build: {
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        interop: "auto", // transforms default import into require('xxx').default;
      },
      external: [
        ...Object.keys(packageJson.dependencies),
        ...Object.keys(packageJson.peerDependencies),
      ],
    },
  },
  plugins: [
    react({
      babel: {
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false, // false will preserve ES modules
              targets: "last 2 versions, > 0.2%, not dead",
              loose: true,
            },
          ],
          "@babel/preset-typescript",
        ],
        plugins: [
          "babel-plugin-transform-typescript-metadata",
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
    dts({
      rollupTypes: true,
      include: ["src"],
    }),
  ],
  test: {
    setupFiles: ["./vitest.setupFile.ts"],
  },
});
