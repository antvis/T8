import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default (name, output = {}, extraPlugins = []) => ({
  input: './src/index.ts',
  output: {
    file: `./dist/${name}.min.js`,
    format: 'umd',
    sourcemap: false,
    name,
    ...output,
  },
  plugins: [resolve(), commonjs(), typescript(), terser(), ...extraPlugins],
});
