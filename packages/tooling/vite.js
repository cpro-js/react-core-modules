/**
 * @import {UserConfig} from "vite"
 * @import { JscConfig } from "@swc/types";
 *
 */
import { resolve } from "path";

import { getTsconfig } from "get-tsconfig";
import nodeExternals from "rollup-plugin-node-externals";
import swc from "unplugin-swc";
import dts from "vite-plugin-dts";
import { mergeConfig } from "vitest/config";

/**
 *
 * @param {string} dirname
 * @returns {UserConfig}
 */
export function createViteConfig(dirname) {
  const tsconfig = getTsconfig(dirname);

  if (tsconfig == null) {
    throw new Error("tsconfig.json not found");
  }

  /** @satisfies {JscConfig} */
  const jscConfig = {
    loose: true,
    keepClassNames: tsconfig.config.compilerOptions.experimentalDecorators,
    parser: {
      syntax: "typescript",
      tsx: true,
      decorators: tsconfig.config.compilerOptions.experimentalDecorators,
    },
    transform: {
      react: {
        runtime: "automatic",
        pragma: tsconfig.config.compilerOptions.jsxFactory,
        pragmaFrag: tsconfig.config.compilerOptions.jsxFragmentFactory,
        importSource: tsconfig.config.compilerOptions.jsxImportSource,
      },
      legacyDecorator: tsconfig.config.compilerOptions.experimentalDecorators,
      decoratorMetadata: tsconfig.config.compilerOptions.emitDecoratorMetadata,
    },
  };

  /** @satisfies {UserConfig} */
  const config = {
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
      swc.vite({
        tsconfigFile: false,
        env: {
          targets: "last 2 versions, >0.2%, not dead",
        },
        jsc: jscConfig,
      }),
    ],
  };

  return config;
}

/**
 *
 * @param {string} dirname
 * @param { { bundleModules?: string[] }} options
 * @returns {UserConfig}
 */
export function createLibraryViteConfig(dirname, options) {
  /** @satisfies {UserConfig} */
  const config = {
    build: {
      emptyOutDir: true,
      sourcemap: true,
      minify: false,
      lib: {
        entry: resolve(dirname, "src/index.ts"),
        formats: ["es"],
        fileName: (format) => `index.${format}.js`,
      },
    },
    plugins: [
      {
        enforce: "pre",
        ...nodeExternals({
          exclude: options.bundleModules ?? [],
        }),
      },
      dts({
        rollupTypes: true,
        include: ["src"],
      }),
    ],
  };

  return mergeConfig(createViteConfig(dirname), config);
}
