import { JscConfig } from "@swc/types";
import { getTsconfig } from "get-tsconfig";
import swc from "unplugin-swc";
import { defineConfig } from "vite";

const tsconfig = getTsconfig(__dirname);

export default defineConfig({
  optimizeDeps: {
    force: true,
  },
  resolve: {
    preserveSymlinks: true,
  },
  plugins: [
    swc.vite({
      tsconfigFile: false,
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
            refresh: true,
          },
          legacyDecorator:
            tsconfig!.config.compilerOptions!.experimentalDecorators,
          decoratorMetadata:
            tsconfig!.config.compilerOptions!.emitDecoratorMetadata,
        },
      } as JscConfig,
    }),
  ],
});
