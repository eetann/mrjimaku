import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from 'unocss/vite';
import { crx } from "@crxjs/vite-plugin";
import manifest from "./src/manifest";

export default defineConfig({
  plugins: [react(), UnoCSS({mode:"shadow-dom"}), crx({ manifest })],
});
