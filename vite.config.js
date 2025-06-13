import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
  // Exclude Python virtual environment and other non-frontend files
  optimizeDeps: {
    exclude: ["server", "venv", "node_modules"],
  },
  // Only include frontend files in the build
  publicDir: "public",
  root: ".",
  // Ignore server and Python files
  define: {
    "process.env": {},
  },
})
