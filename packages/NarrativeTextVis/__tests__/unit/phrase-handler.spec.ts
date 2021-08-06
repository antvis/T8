import numeral from 'numeral';
import { parsePhrase } from '../../src/utils/phrase-parser';
import { getPrefixCls } from '../../src/utils/getPrefixCls';

describe('phrase handler', () => {
  it('text', () => {
    const value = 'value';
    const pp = parsePhrase({
      type: 'text',
      value: value,
    });
    expect(pp.classNames).toEqual([]);
    expect(pp.content).toBe(value);
    expect(pp.assessment).toBeNull();
    expect(pp.originalData).toBeUndefined();
  });

  it('metric_name', () => {
    const value = 'value';
    const pp = parsePhrase({
      type: 'entity',
      value: value,
      metadata: {
        entityType: 'metric_name',
      },
    });
    expect(pp.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-name')]);
    expect(pp.content).toBe(value);
    expect(pp.assessment).toBeNull();
    expect(pp.originalData).toBeUndefined();
  });

  it('metric_value -- value', () => {
    const value = '100w';
    const pp = parsePhrase({
      type: 'entity',
      value: value,
      metadata: {
        entityType: 'metric_value',
        data: 1000,
      },
    });

    expect(pp.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(pp.content).toBe(value);
    expect(pp.assessment).toBeNull();
    expect(pp.originalData).toBe(1000);
  });

  it('metric_value -- data & format', () => {
    const pp = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'metric_value',
        data: 1000,
        format: '0,0',
      },
    });

    expect(pp.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(pp.content).toBe(numeral(1000).format('0,0'));
    expect(pp.assessment).toBeNull();
    expect(pp.originalData).toBe(1000);
  });

  it('metric_value -- data < 0', () => {
    const pp = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'metric_value',
        data: -1000,
        format: '0,0',
      },
    });

    expect(pp.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(pp.content).toBe(numeral(-1000).format('0,0'));
    expect(pp.assessment).toBeNull();
    expect(pp.originalData).toBe(-1000);
  });

  it('metric_value -- data', () => {
    const pp = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'metric_value',
        data: 1000,
      },
    });

    expect(pp.classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(pp.content).toBe('1000');
    expect(pp.assessment).toBeNull();
    expect(pp.originalData).toBe(1000);
  });

  it('ratio_value -- data compare', () => {
    const pp = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'ratio_value',
        data: -1000,
      },
    });

    expect(pp.classNames).toEqual([getPrefixCls('value'), getPrefixCls('value-negative')]);
    expect(pp.content).toBe('1000');
    expect(pp.assessment).toBe('negative');
    expect(pp.originalData).toBe(-1000);
  });

  it('delta_value -- data compare', () => {
    const pp = parsePhrase({
      type: 'entity',
      metadata: {
        entityType: 'delta_value',
        data: -1000,
        format: '0,0',
      },
    });

    expect(pp.classNames).toEqual([getPrefixCls('value'), getPrefixCls('value-negative')]);
    expect(pp.content).toBe('-1,000');
    expect(pp.assessment).toBe('negative');
    expect(pp.originalData).toBe(-1000);
  });
});
