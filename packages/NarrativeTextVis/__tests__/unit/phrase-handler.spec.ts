import numeral from 'numeral';
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

  it('metric_value -- value', () => {
    const value = '100w';
    const phraseParser = parsePhrase({
      type: 'entity',
      value: value,
      metadata: {
        entityType: 'metric_value',
        data: 1000,
      },
    });

    expect(phraseParser.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(phraseParser.content).toBe(value);
    expect(phraseParser.assessment).toBeNull();
    expect(phraseParser.originalData).toBe(1000);
  });

  it('metric_value -- data & format', () => {
    const phraseParser = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'metric_value',
        data: 1000,
        format: '0,0',
      },
    });

    expect(phraseParser.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(phraseParser.content).toBe(numeral(1000).format('0,0'));
    expect(phraseParser.assessment).toBeNull();
    expect(phraseParser.originalData).toBe(1000);
  });

  it('metric_value -- data < 0', () => {
    const phraseParser = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'metric_value',
        data: -1000,
        format: '0,0',
      },
    });

    expect(phraseParser.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(phraseParser.content).toBe(numeral(-1000).format('0,0'));
    expect(phraseParser.assessment).toBeNull();
    expect(phraseParser.originalData).toBe(-1000);
  });

  it('metric_value -- data', () => {
    const phraseParser = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'metric_value',
        data: 1000,
      },
    });

    expect(phraseParser.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(phraseParser.content).toBe('1000');
    expect(phraseParser.assessment).toBeNull();
    expect(phraseParser.originalData).toBe(1000);
  });

  it('ratio_value -- data compare', () => {
    const phraseParser = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'ratio_value',
        data: -1000,
      },
    });

    expect(phraseParser.classNames).toEqual([getPrefixCls('value'), getPrefixCls('value-negative')]);
    expect(phraseParser.content).toBe('1000');
    expect(phraseParser.assessment).toBe('negative');
    expect(phraseParser.originalData).toBe(-1000);
  });

  it('delta_value -- data compare', () => {
    const phraseParser = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'delta_value',
        data: -1000,
        format: '0,0',
      },
    });

    expect(phraseParser.classNames).toEqual([getPrefixCls('value'), getPrefixCls('value-negative')]);
    expect(phraseParser.content).toBe('1,000');
    expect(phraseParser.assessment).toBe('negative');
    expect(phraseParser.originalData).toBe(-1000);
  });
});
