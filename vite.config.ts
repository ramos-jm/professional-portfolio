// Project Vite configuration (removed external wrapper)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  // Base path for GitHub Pages deployment under this repo's subfolder
  base: "/professional-portfolio/",
  plugins: [react(), tsconfigPaths(), tailwind()],
  // Build output configured for GitHub Pages (serve from `docs` folder)
  build: {
    outDir: "docs",
  },
});
