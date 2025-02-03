import { resolve } from "path";

import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    emptyOutDir: true,
    sourcemap: true,
    ssr: true, // disable bundling of node_modules
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          "babel-plugin-transform-typescript-metadata",
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
    react(),
    dts({
      rollupTypes: true,
      include: ["src"],
    }),
  ],
  test: {
    setupFiles: ["./vitest.setupFile.ts"],
  },
});
