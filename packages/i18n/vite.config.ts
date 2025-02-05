import { resolve } from "path";

import { JscConfig } from "@swc/types";
import { getTsconfig } from "get-tsconfig";
import nodeExternals from "rollup-plugin-node-externals";
import swc from "unplugin-swc";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

import packageJson from "./package.json";

const tsconfig = getTsconfig(__dirname);

export default defineConfig({
  build: {
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  resolve: {
    conditions: ["cpro-js-source"],
  },
  environments: {
    ssr: {
      resolve: {
        conditions: ["cpro-js-source"], // fixes https://github.com/vitest-dev/vitest/issues/6992
      },
    },
  },
  plugins: [
    {
      enforce: "pre",
      ...nodeExternals({
        exclude: [
          "intl-format-cache", // invalid cjs / esm module -> just include it into bundle
        ],
      }),
    },
    swc.vite({
      tsconfigFile: false,
      env: {
        targets: packageJson.browserslist,
      },
      jsc: {
        loose: true,
        keepClassNames:
          tsconfig!.config.compilerOptions!.experimentalDecorators,
        parser: {
          syntax: "typescript",
          tsx: true,
          decorators: tsconfig!.config.compilerOptions!.experimentalDecorators,
        },
        transform: {
          react: {
            runtime: "automatic",
            pragma: tsconfig!.config.compilerOptions!.jsxFactory,
            pragmaFrag: tsconfig!.config.compilerOptions!.jsxFragmentFactory,
            importSource: tsconfig!.config.compilerOptions!.jsxImportSource,
          },
          legacyDecorator:
            tsconfig!.config.compilerOptions!.experimentalDecorators,
          decoratorMetadata:
            tsconfig!.config.compilerOptions!.emitDecoratorMetadata,
        },
      } as JscConfig,
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
