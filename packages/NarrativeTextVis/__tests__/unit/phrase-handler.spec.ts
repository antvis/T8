import { parsePhrase } from '../../src/utils/phrase-parser';
import { getPrefixCls } from '../../src/utils/getPrefixCls';

describe('phrase handler', () => {
  it('text', () => {
    const value = 'value';
    const phraseParser = parsePhrase({
      type: 'text',
      value: value,
    });
    expect(phraseParser.classNames).toEqual([]);
    expect(phraseParser.content).toBe(value);
    expect(phraseParser.assessment).toBeNull();
    expect(phraseParser.originalData).toBeUndefined();
  });

  it('metric_name', () => {
    const value = 'value';
    const phraseParser = parsePhrase({
      type: 'entity',
      value: value,
      metadata: {
        entityType: 'metric_name',
      },
    });
    expect(phraseParser.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-name')]);
    expect(phraseParser.content).toBe(value);
    expect(phraseParser.assessment).toBeNull();
    expect(phraseParser.originalData).toBeUndefined();
  });
});
