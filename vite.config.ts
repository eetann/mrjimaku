import path from "node:path";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import manifest from "./src/manifest";
import viteTouchGlobalCss from "./vite-plugin-touch-global-css";

export default defineConfig({
  plugins: [
    react(),
    viteTouchGlobalCss({
      cssFilePath: path.resolve(__dirname, "src/content/index.css"),
      watchMatch: /src/,
    }),
    crx({ manifest }),
  ],
});
