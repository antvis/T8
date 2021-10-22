import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const format = process.env.FORMAT;

const OUT_DIR_NAME_MAP = {
  esm: 'es',
  cjs: 'lib',
  umd: 'dist',
};

const outDir = OUT_DIR_NAME_MAP[format];

const output = {
  name: 'NarrativeTextVis',
  format,
  preserveModules: format === 'es',
  sourcemap: 'inline',
  preserveModulesRoot: 'src',
};

const plugins = [
  peerDepsExternal(),
  typescript({
    outDir,
  }),
  commonjs(),
  resolve(),
  postcss({
    minimize: true,
    sourceMap: false,
    extensions: ['.less', '.css'],
    use: [['less', { javascriptEnabled: true }]],
    plugins: [autoprefixer],
    extract: 'index.css',
  }),
  filesize(),
];

if (format === 'umd') {
  output.file = 'dist/narrative-text-vis.min.js';
  plugins.push(terser());
  output.globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    antd: 'antd',
    '@antv/g2plot': 'G2Plot',
  };
} else {
  output.dir = outDir;
}

export default {
  input: 'src/index.ts',
  output,
  plugins,
};
