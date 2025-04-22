import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';
const generateSourceMap = process.env.SOURCE_MAP !== 'false';

/* global process */

const getPlugins = (outDir) => {
  const plugins = [
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      preferBuiltins: true,
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      outDir,
      noEmit: true,
      declaration: false,
      declarationDir: undefined,
      declarationMap: false,
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
      file: `./dist/t8${minify ? '.min' : ''}.js`,
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
  plugins: [...getPlugins('./dist')],
});

// configs
const configs = [
  // es bundle
  {
    input: 'src/index.ts',
    output: [
      {
        dir: './es',
        format: 'esm',
        sourcemap: generateSourceMap,
        preserveModules: true,
      },
    ],
    external: [/node_modules/],
    plugins: getPlugins('./es'),
    cache: true,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  },

  // cjs bundle
  {
    input: 'src/index.ts',
    output: [
      {
        dir: './lib',
        format: 'cjs',
        sourcemap: generateSourceMap,
        preserveModules: true,
      },
    ],
    external: [/node_modules/],
    plugins: getPlugins('./lib'),
    cache: true,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  },

  createUmdConfig(isProduction),
];

export default defineConfig(configs);
