import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    extends: [
      "airbnb",
      "airbnb-typescript",
      "airbnb/hooks",
      "standard-with-typescript",
      "plugin:prettier/recommended",
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
