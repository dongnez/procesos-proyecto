import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
    },
  },
})
