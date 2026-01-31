import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  root: './example',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [preact()],
});
