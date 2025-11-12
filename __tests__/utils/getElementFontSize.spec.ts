import { describe, it, expect } from 'vitest';
import { getElementFontSize } from '../../src/utils/getElementFontSize';
import { ParagraphType } from '../../src/schema';
import { SeedTokenOptions } from '../../src/theme';

describe('getElementFontSize', () => {
  const mockThemeSeedToken: SeedTokenOptions = {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'PingFangSC, sans-serif',
    borderColor: 'rgb(199, 199, 199)',
    fontSizeMultiples: {
      h1: 2,
      h2: 1.72,
      h3: 1.4,
      h4: 1.15,
      h5: 1.08,
      h6: 1.08,
    },
    lineHeightMultiples: {
      h1: 1.5,
      h2: 1.3,
      h3: 1.15,
      h4: 1,
      h5: 1,
      h6: 1,
    },
    colorBase: '#000',
    colorEntityBase: '#000',
    colorHeadingBase: '#000',
    colorPositive: '#000',
    colorNegative: '#000',
    colorConclusion: '#000',
    colorDimensionValue: '#000',
    colorMetricName: '#000',
    colorMetricValue: '#000',
    colorOtherValue: '#000',
    colorProportionShadow: '#000',
    colorProportionFill: '#000',
    colorLineStroke: '#000',
  };

  it('should return correct font size for headline (h1)', () => {
    const result = getElementFontSize(ParagraphType.HEADLINE, mockThemeSeedToken);
    expect(result).toBe(14 * 2); // fontSize * h1 multiple
  });

  it('should return correct font size for heading1', () => {
    const result = getElementFontSize(ParagraphType.HEADING1, mockThemeSeedToken);
    expect(result).toBe(14 * 2); // fontSize * h1 multiple
  });

  it('should return correct font size for heading2', () => {
    const result = getElementFontSize(ParagraphType.HEADING2, mockThemeSeedToken);
    expect(result).toBe(14 * 1.72); // fontSize * h2 multiple
  });

  it('should return correct font size for heading3', () => {
    const result = getElementFontSize(ParagraphType.HEADING3, mockThemeSeedToken);
    expect(result).toBe(14 * 1.4); // fontSize * h3 multiple
  });

  it('should return correct font size for heading4', () => {
    const result = getElementFontSize(ParagraphType.HEADING4, mockThemeSeedToken);
    expect(result).toBe(14 * 1.15); // fontSize * h4 multiple
  });

  it('should return correct font size for heading5', () => {
    const result = getElementFontSize(ParagraphType.HEADING5, mockThemeSeedToken);
    expect(result).toBe(14 * 1.08); // fontSize * h5 multiple
  });

  it('should return correct font size for heading6', () => {
    const result = getElementFontSize(ParagraphType.HEADING6, mockThemeSeedToken);
    expect(result).toBe(14 * 1.08); // fontSize * h6 multiple
  });

  it('should return fontSize when paragraphType is normal (no multiple)', () => {
    const result = getElementFontSize(ParagraphType.NORMAL, mockThemeSeedToken);
    expect(result).toBe(14); // fontSize * 1 (default multiple)
  });

  it('should return fontSize when paragraphType is bullets (no multiple)', () => {
    const result = getElementFontSize(ParagraphType.BULLETS, mockThemeSeedToken);
    expect(result).toBe(14); // fontSize * 1 (default multiple)
  });

  it('should use default fontSize (12) when fontSize is not provided', () => {
    const themeWithoutFontSize = {
      ...mockThemeSeedToken,
      fontSize: undefined,
    } as unknown as SeedTokenOptions;

    const result = getElementFontSize(ParagraphType.HEADLINE, themeWithoutFontSize);
    expect(result).toBe(12 * 2); // default fontSize * h1 multiple
  });

  it('should throw error when fontSizeMultiples is not provided for heading types', () => {
    const themeWithoutMultiples = {
      ...mockThemeSeedToken,
      fontSizeMultiples: undefined,
    } as unknown as SeedTokenOptions;

    expect(() => {
      getElementFontSize(ParagraphType.HEADLINE, themeWithoutMultiples);
    }).toThrow();
  });

  it('should use default multiple (1) when specific heading multiple is missing', () => {
    const themeWithPartialMultiples = {
      ...mockThemeSeedToken,
      fontSizeMultiples: {
        h1: 2,
        h2: 1.72,
        // h3 is missing
        h4: 1.15,
        h5: 1.08,
        h6: 1.08,
      },
    } as SeedTokenOptions;

    const result = getElementFontSize(ParagraphType.HEADING3, themeWithPartialMultiples);
    expect(result).toBe(14 * 1); // fontSize * default multiple
  });

  it('should handle custom fontSize and multiples', () => {
    const customTheme: SeedTokenOptions = {
      ...mockThemeSeedToken,
      fontSize: 16,
      fontSizeMultiples: {
        h1: 2.5,
        h2: 2,
        h3: 1.5,
        h4: 1.25,
        h5: 1.1,
        h6: 1.05,
      },
    };

    expect(getElementFontSize(ParagraphType.HEADLINE, customTheme)).toBe(16 * 2.5);
    expect(getElementFontSize(ParagraphType.HEADING2, customTheme)).toBe(16 * 2);
    expect(getElementFontSize(ParagraphType.HEADING3, customTheme)).toBe(16 * 1.5);
  });

  it('should throw error when fontSizeMultiples is not provided even for normal type', () => {
    const emptyTheme = {} as SeedTokenOptions;
    expect(() => {
      getElementFontSize(ParagraphType.NORMAL, emptyTheme);
    }).toThrow();
  });

  it('should throw error when fontSizeMultiples is not provided for heading types with empty theme', () => {
    const emptyTheme = {} as SeedTokenOptions;
    expect(() => {
      getElementFontSize(ParagraphType.HEADLINE, emptyTheme);
    }).toThrow();
  });
});
