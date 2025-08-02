import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["uk", "en"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/translations",
      include: ["src"],
    },
  ],
});
