import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const workspaceRoot = path.resolve(__dirname, '..');
const t8Src = path.resolve(workspaceRoot, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@t8': t8Src,
    },
  },
  server: {
    port: 4399,
    fs: {
      allow: [workspaceRoot],
    },
  },
});
