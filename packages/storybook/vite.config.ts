import { createViteConfig } from "@cpro-js/tooling/vite";
import { defineConfig, mergeConfig } from "vitest/config";

export default defineConfig(() => {
  return mergeConfig(createViteConfig(__dirname), {});
});
