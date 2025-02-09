import { createLibraryViteConfig } from "@cpro-js/tooling/vite";
import { defineConfig, mergeConfig } from "vitest/config";

export default defineConfig(() => {
  return mergeConfig(createLibraryViteConfig(__dirname, {}), {
    test: {
      setupFiles: ["./vitest.setupFile.ts"],
    },
  });
});
