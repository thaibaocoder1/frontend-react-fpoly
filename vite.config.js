import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@api": "/src/api",
      "@modules": "/src/modules",
      "@layout": "/src/layout",
      "@pages": "/src/pages",
      "@app": "/src/app",
      "@constants": "/src/constants",
      "@utils": "/src/utils",
      "@routes": "/src/routes",
      "@hooks": "/src/hooks",
    },
  },
});
