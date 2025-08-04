import { defineConfig } from "vite";

import path from "node:path";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { lingui } from "@lingui/vite-plugin";
import commonjs from "vite-plugin-commonjs";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@locales": path.resolve(__dirname, "./src/locales"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@use "/src/shared/config/breakpoints.scss";' +
          "\n" +
          '@use "/src/shared/config/colors.scss";' +
          "\n" +
          '@use "/src/shared/utils/mixins.scss";',
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    lingui(),
    svgr(),
    commonjs(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true,
  },
});
