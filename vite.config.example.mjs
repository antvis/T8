import { defineConfig } from 'vite';

export default defineConfig({
  root: './example',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
