var concurrently = require('concurrently');

concurrently([
  'cd ./packages/text-schema && yarn watch',
  'cd ./packages/NarrativeTextVis && yarn watch',
  'cd ./examples/ntv-demo && yarn start',
]).then(
  () => {
    console.log('success');
  },
  () => {
    console.log('fail');
  },
);
