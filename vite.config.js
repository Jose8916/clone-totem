import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import viteCompression from 'vite-plugin-compression';
import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),viteCompression(),splitVendorChunkPlugin()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    compress: true
  },
});
