import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL("./preview/", import.meta.url)),
  base: "/capa-preview/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("../dist-capa-preview/", import.meta.url)),
    emptyOutDir: true,
  },
});
