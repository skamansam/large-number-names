import { defineConfig } from "vite";
import path from "path";
import { configDefaults } from "vitest/config";
import fs from "fs";

export default defineConfig({
  test: {
    testFiles: ["test/*.spec.{ts,tsx,js,jsx}"],
    coverage: {
      provider: "v8",
      exclude: [...configDefaults.coverage.exclude, "*.config.js"],
      all: true,
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "Large Number Names",
      fileName: (format) => `large-number-names.${format}.js`,
      formats: ["es"],
    },
  },
  plugins: [
    {
      name: "emit-index",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "index.html",
          source: fs.readFileSync(
            path.resolve(__dirname, "site/index.html"),
            "utf-8"
          ),
        });
      },
    },
  ],
});
