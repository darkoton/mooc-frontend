import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import pluginLingui from "eslint-plugin-lingui";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      "vite.config.ts",
      "**/*.config.{ts,js}",
      "**/.storybook/**",
      "src/locales/**/translations.ts",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: new URL(".", import.meta.url),
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      lingui: pluginLingui,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "lingui/t-call-in-function": "error",
      "lingui/no-unlocalized-strings": [
        "warn",
        {
          ignore: [
            // Ignore strings which are a single "word" (no spaces)
            // and doesn't start with an uppercase letter
            "^(?![A-Z])\\S+$",
            // Ignore UPPERCASE literals
            // Example: const test = "FOO"
            "^[A-Z0-9_-]+$",
          ],
          ignoreNames: [
            // Ignore matching className (case-insensitive)
            { regex: { pattern: "className", flags: "i" } },
            // Ignore UPPERCASE names
            // Example: test.FOO = "ola!"
            { regex: { pattern: "^[A-Z0-9_-]+$" } },
            "styleName",
            "src",
            "srcSet",
            "type",
            "id",
            "width",
            "height",
            "displayName",
            "Authorization",
          ],
          ignoreFunctions: [
            "cva",
            "cn",
            "track",
            "Error",
            "console.*",
            "*headers.set",
            "*.addEventListener",
            "*.removeEventListener",
            "*.postMessage",
            "*.getElementById",
            "*.dispatch",
            "*.commit",
            "*.includes",
            "*.indexOf",
            "*.endsWith",
            "*.startsWith",
            "require",
          ],
          // Following settings require typed linting https://typescript-eslint.io/getting-started/typed-linting/
          useTsTypes: true,
          ignoreMethodsOnTypes: [
            // Ignore specified methods on Map and Set types
            "Map.get",
            "Map.has",
            "Set.has",
          ],
        },
      ],
      "@typescript-eslint/no-require-imports": "off",
    },
  }
);
