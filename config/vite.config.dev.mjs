import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  root: './__tests__',
  server: {
    port: 3093,
  },
  plugins: [preact()],
});
