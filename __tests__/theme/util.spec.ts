import { describe, it, expect } from 'vitest';
import { getThemeSeedToken } from '../../src/theme/util';
import { baseSeedToken, presetTheme } from '../../src/theme/seed';

describe('getThemeSeedToken', () => {
  it('should return light theme token when theme is "light"', () => {
    const result = getThemeSeedToken('light');

    expect(result).toEqual({
      ...baseSeedToken,
      ...presetTheme.light,
    });
  });

  it('should return dark theme token when theme is "dark"', () => {
    const result = getThemeSeedToken('dark');

    expect(result).toEqual({
      ...baseSeedToken,
      ...presetTheme.dark,
    });
  });

  it('should merge custom seedToken with theme token', () => {
    const customToken = { primaryColor: '#ff0000' };
    // @ts-expect-error expected to test partial token
    const result = getThemeSeedToken('light', customToken);

    expect(result).toEqual({
      ...baseSeedToken,
      ...presetTheme.light,
      ...customToken,
    });
  });

  it('should handle undefined seedToken', () => {
    const result = getThemeSeedToken('light', undefined);

    expect(result).toEqual({
      ...baseSeedToken,
      ...presetTheme.light,
    });
  });

  it('should prioritize custom seedToken over theme token', () => {
    const customToken = { primaryColor: '#custom' };
    // @ts-expect-error expected to test partial token
    const result = getThemeSeedToken('light', customToken);

    // @ts-expect-error expected to test partial token
    expect(result.primaryColor).toBe('#custom');
  });

  it('should default to light theme when theme is undefined', () => {
    const result = getThemeSeedToken(undefined);

    expect(result).toEqual({
      ...baseSeedToken,
      ...presetTheme.light,
    });
  });
});
