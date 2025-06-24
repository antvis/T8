import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  root: './example',
  server: {
    port: 3093,
  },
  plugins: [preact()],
});
