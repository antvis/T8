import json from '@rollup/plugin-json';
import rollupConfig from '../../config/rollup-react';

export default rollupConfig('NarrativeTextEditor', {
  plugins: [json()],
});
