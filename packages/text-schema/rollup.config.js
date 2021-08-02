import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
// import filesize from 'rollup-plugin-filesize';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/text-schema.min.js',
      name: 'text-schema',
      format: 'umd',
      sourcemap: true,
    },
  ],
  plugins: [typescript(), resolve(), commonjs(), terser()],
};
