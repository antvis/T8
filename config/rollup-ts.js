import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default (name, { plugins = [], ...others } = {}) => ({
  input: './src/index.ts',
  sourcemap: true,
  output: {
    file: `./dist/${name}.min.js`,
    format: 'umd',
    sourcemap: false,
    name,
  },
  plugins: [resolve(), commonjs(), typescript(), terser(), ...plugins],
  ...others,
});
