var concurrently = require('concurrently');

concurrently([
  'cd ./packages/text-schema && yarn watch:esm',
  'cd ./packages/text-schema && yarn watch:cjs',
  'cd ./packages/NarrativeTextVis && yarn watch:esm',
  'cd ./packages/NarrativeTextVis && yarn watch:cjs',
  'cd ./packages/TextTemplateEditor && yarn watch:esm',
  'cd ./packages/TextTemplateEditor && yarn watch:cjs',
  'cd ./examples/ntv-demo && yarn start',
]).then(
  () => {
    console.log('success');
  },
  () => {
    console.log('fail');
  },
);
