import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import css from 'rollup-plugin-import-css';
import rollupConfig from '../../config/rollup-react';

export default rollupConfig('NarrativeTextEditor', {
  external: ['react', 'react-dom', 'antd'],
  plugins: [
    // Convert JSON imports to ES6 modules.
    json(),

    // Register Node.js builtins for browserify compatibility.
    builtins(),

    // Register Node.js globals for browserify compatibility.
    globals(),

    // import css file
    css({ output: 'index.css' }),
  ],
});
