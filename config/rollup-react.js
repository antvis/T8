import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import optimizeLodashImports from 'rollup-plugin-optimize-lodash-imports';
import { kebabCase } from 'lodash';

/**
 * @param name upper camel case
 */
export default (name, config = {}) => {
  const { plugins: extraPlugins = [], globals = {}, ...others } = config;

  const format = process.env.FORMAT;

  const OUT_DIR_NAME_MAP = {
    esm: 'es',
    cjs: 'lib',
    umd: 'dist',
  };

  const outDir = OUT_DIR_NAME_MAP[format];

  const output = {
    name,
    format,
    preserveModules: format === 'es',
    sourcemap: 'inline',
    preserveModulesRoot: 'src',
  };

  const plugins = [
    peerDepsExternal(),
    optimizeLodashImports(),
    typescript({
      outDir,
    }),
    commonjs(),
    resolve(),
    filesize(),
  ];

  if (format === 'umd') {
    output.file = `dist/${kebabCase(name)}.min.js`;
    plugins.push(terser());
    output.globals = {
      react: 'React',
      'react-dom': 'ReactDOM',
      ...globals,
    };
  } else {
    output.dir = outDir;
  }

  return {
    input: 'src/index.ts',
    output,
    plugins: [...plugins, ...extraPlugins],
    ...others,
  };
};
