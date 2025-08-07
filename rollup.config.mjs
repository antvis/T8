import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const generateSourceMap = process.env.SOURCE_MAP !== 'false';

const UMD_OUT_DIR = path.resolve('dist');
const ES_OUT_DIR = path.resolve('es');
const CJS_OUT_DIR = path.resolve('lib');

/* global process */

const getPlugins = (outDir) => {
  const plugins = [
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      preferBuiltins: false,
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: path.resolve('tsconfig.json'),
      outDir,
      noEmit: true,
      importHelpers: true,
      rootDir: path.resolve('src'),
    }),
    json(),
  ];

  return plugins;
};

// create umd bundle
const createUmdConfig = (minify = false) => ({
  input: 'src/index.ts',
  output: [
    {
      file: path.resolve(UMD_OUT_DIR, `t8${minify ? '.min' : ''}.js`),
      format: 'umd',
      name: 'T8',
      sourcemap: generateSourceMap,
      plugins:
        minify && isProduction
          ? [
              terser({
                compress: {
                  drop_console: isProduction,
                  drop_debugger: isProduction,
                },
              }),
            ]
          : [],
      preserveModules: false,
    },
  ],
  plugins: getPlugins(UMD_OUT_DIR),
});

// configs
const configs = [
  // es bundle
  {
    input: 'src/index.ts',
    output: [
      {
        dir: ES_OUT_DIR,
        format: 'esm',
        sourcemap: generateSourceMap,
        preserveModules: true,
      },
    ],
    external: [/tslib/, /node_modules/],
    plugins: getPlugins(ES_OUT_DIR),
    cache: true,
  },

  // cjs bundle
  {
    input: 'src/index.ts',
    output: [
      {
        dir: CJS_OUT_DIR,
        format: 'cjs',
        sourcemap: generateSourceMap,
        preserveModules: true,
      },
    ],
    external: [/tslib/, /node_modules/],
    plugins: getPlugins(CJS_OUT_DIR),
    cache: true,
  },

  createUmdConfig(isProduction),
];

export default defineConfig(configs);
