import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "Mr.Jimaku",
  description: "Show your caption on the YouTube",
  version: "1.2",
  icons: {
    "32": "icons/icon-32x32.png",
    "48": "icons/icon-48x48.png",
    "128": "icons/icon-128x128.png",
  },
  content_scripts: [
    {
      js: ["src/content/index.tsx"],
      matches: ["https://www.youtube.com/*"],
    },
  ],
});
