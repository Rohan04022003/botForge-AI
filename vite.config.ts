import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// For Vercel, base should be "/"
export default defineConfig({
  base: "/", // ✅ KEEP this as default
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
