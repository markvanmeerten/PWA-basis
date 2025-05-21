import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "My Counter",
        short_name: "Counter",
        description: "Increase by one..",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        offline_enabled: true,
        icons: [
          {
            src: "logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:8000", // Fake CORS
    },
    host: true, // bind op 0.0.0.0
    port: 5173,
    watch: {
      usePolling: true,
    },
    strictPort: true,
    hmr: {
      clientPort: 5173, // gebruik externe poort voor hot module reloading, niet 80 of 443
    },
  },
});
