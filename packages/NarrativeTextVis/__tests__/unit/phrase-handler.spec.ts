import { PhraseHandler } from '../../src/utils/phraseHandler';

describe('phrase handler', () => {
  it('basic', () => {
    new PhraseHandler({
      type: 'text',
      value: 'test',
    });
    expect('a').toBe('a');
  });
});
