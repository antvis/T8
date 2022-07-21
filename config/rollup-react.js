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
    sourcemap: true,
    preserveModulesRoot: 'src',
  };

  const plugins = [
    // Rewrites lodash imports to be specific for easier tree-shaking.
    optimizeLodashImports(),

    // Seamless integration between Rollup and Typescript.
    typescript({
      outDir,
    }),

    // Allow Rollup to resolve modules from `node_modules`, since it only
    // resolves local modules by default.
    resolve({
      browser: true,
    }),

    // Allow Rollup to resolve CommonJS modules, since it only resolves ES2015
    // modules by default.
    commonjs({
      include: /node_modules/,
    }),

    filesize(),
    ...extraPlugins,
  ];

  // If external is not specified, peerDeps external will be removed by default
  if (!others.external) plugins.unshift(peerDepsExternal());

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
    plugins,
    ...others,
  };
};
