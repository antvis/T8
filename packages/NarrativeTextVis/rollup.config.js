import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import rollupConfig from '../../config/rollup-react';

export default rollupConfig('NarrativeTextVis', {
  plugins: [
    postcss({
      minimize: true,
      sourceMap: false,
      extensions: ['.less', '.css'],
      use: [['less', { javascriptEnabled: true }]],
      plugins: [autoprefixer],
      extract: 'index.css',
    }),
  ],
});
