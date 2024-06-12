import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  plugins: [react()],

  // 👇 Insert these lines
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "pollWidget",
      fileName: (format) => `poll-widget.${format}.js`,
    },
    target: "esnext",
  },
});
