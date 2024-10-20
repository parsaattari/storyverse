import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // Add Node.js polyfill plugin
  ],
  resolve: {
    alias: {
      path: resolve(__dirname, 'node_modules/path-browserify'), // Use an absolute path for 'path-browserify'
    },
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
});
