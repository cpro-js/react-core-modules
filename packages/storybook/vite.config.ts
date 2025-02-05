import { JscConfig } from "@swc/types";
import { getTsconfig } from "get-tsconfig";
import swc from "unplugin-swc";
import { defineConfig } from "vite";

import packageJson from "./package.json";

const tsconfig = getTsconfig(__dirname);

export default defineConfig(() => {
  return {
    resolve: {
      conditions: ["cpro-js-source"],
    },
    plugins: [
      swc.vite({
        tsconfigFile: false,
        env: {
          targets: packageJson.browserslist,
        },
        exclude: [], // transform even node_modules
        jsc: {
          loose: true,
          keepClassNames:
            tsconfig!.config.compilerOptions!.experimentalDecorators,
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators:
              tsconfig!.config.compilerOptions!.experimentalDecorators,
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
    ],
  };
});
