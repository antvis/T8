import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import rollupConfig from '../../config/rollup-react';

export default rollupConfig('NarrativeTextEditor', {
  external: [
    'react',
    'react-dom',
    'antd',
    // TODO 项目并没有用到 code-block，可是 plate-ui 依赖 code-block，暂时 external 掉，之后在一起整理依赖
    '@udecode/plate-code-block',
    'prismjs',
  ],
  plugins: [
    // Convert JSON imports to ES6 modules.
    json(),

    // Register Node.js builtins for browserify compatibility.
    builtins(),

    // Register Node.js globals for browserify compatibility.
    globals(),
  ],
});
