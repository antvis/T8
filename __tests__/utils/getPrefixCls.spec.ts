import { getPrefixCls } from '../../src/utils/getPrefixCls';

describe('getPrefixCls', () => {
  it('should return default prefix when no arguments provided', () => {
    const result = getPrefixCls(undefined);
    expect(result).toBe('t8-undefined');
  });

  it('should return prefixed class name with suffix', () => {
    const result = getPrefixCls('button');
    expect(result).toBe('t8-button');
  });

  it('should handle empty suffix', () => {
    const result = getPrefixCls('');
    expect(result).toBe('t8-');
  });

  it('should handle custom prefix with empty suffix', () => {
    const result = getPrefixCls('');
    expect(result).toBe('t8-');
  });
});
