import { defineConfig } from "vite";
import { resolve } from "path";
import { configDefaults } from "vitest/config";

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
      entry: resolve(__dirname, "lib/index.js"),
      name: "Large Number Names",
      fileName: (format) => `large-number-names.${format}.js`,
      formats: ["es"],
    },
  },
});
