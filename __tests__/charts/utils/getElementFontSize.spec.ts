import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getElementFontSize, DEFAULT_FONT_SIZE } from '../../../src/charts/utils/getElementFontSize';
import { vi } from 'vitest';

describe('getElementFontSize', () => {
  let testElement: HTMLDivElement;
  let originalGetComputedStyle: typeof window.getComputedStyle;

  beforeEach(() => {
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
    originalGetComputedStyle = window.getComputedStyle;
  });

  afterEach(() => {
    document.body.removeChild(testElement);
    window.getComputedStyle = originalGetComputedStyle;
  });

  it('should return element font size when available in px', () => {
    testElement.style.fontSize = '16px';
    const result = getElementFontSize(testElement);
    expect(result).toBe(16);
  });

  it('should return body font size when element font size is not in px', () => {
    testElement.style.fontSize = '1em';
    document.body.style.fontSize = '18px';
    const result = getElementFontSize(testElement);
    expect(result).toBe(18);
  });

  it('should return default size when neither element nor body has px font size', () => {
    testElement.style.fontSize = '1em';
    document.body.style.fontSize = '1rem';
    const result = getElementFontSize(testElement);
    expect(result).toBe(DEFAULT_FONT_SIZE);
  });

  it('should return custom default size when provided', () => {
    testElement.style.fontSize = '1em';
    document.body.style.fontSize = '1rem';
    const customDefault = 20;
    const result = getElementFontSize(testElement, customDefault);
    expect(result).toBe(customDefault);
  });

  it('should handle element with no font size style', () => {
    document.body.style.fontSize = '12px';
    const result = getElementFontSize(testElement);
    expect(result).toBe(12);
  });

  it('should handle zero font size', () => {
    testElement.style.fontSize = '-invalid-font-size';
    const result = getElementFontSize(testElement);
    expect(result).toBe(12);
  });

  it('should handle decimal font sizes', () => {
    testElement.style.fontSize = '14.5px';
    const result = getElementFontSize(testElement);
    expect(result).toBe(14.5);
  });

  it('should handle invalid px values', () => {
    testElement.style.fontSize = '16px';
    const result = getElementFontSize(testElement);
    expect(result).toBe(16);
  });

  it('should work with IE currentStyle fallback', () => {
    // @ts-expect-error for testing purposes
    window.getComputedStyle = undefined;
    // @ts-expect-error for testing purposes
    testElement.currentStyle = { 'font-size': '20px' };
    const result = getElementFontSize(testElement);
    expect(result).toBe(20);
  });

  it('should handle undefined computed style', () => {
    window.getComputedStyle = vi.fn().mockReturnValue({
      'font-size': '80px',
    });

    document.body.style.fontSize = '15px';
    const result = getElementFontSize(testElement);
    expect(result).toBe(80);
  });

  it('should handle body with invalid font size', () => {
    testElement.style.fontSize = '1em';
    window.getComputedStyle = (element) => {
      if (element === document.body) {
        // @ts-expect-error for testing purposes
        return { 'font-size': 'invalidpx' } as CSSStyleDeclaration;
      }
      return originalGetComputedStyle(element);
    };
    const result = getElementFontSize(testElement);
    expect(result).toBe(DEFAULT_FONT_SIZE);
  });

  it('should handle negative font sizes', () => {
    testElement.style.fontSize = '100px';
    const result = getElementFontSize(testElement);
    expect(result).toBe(100);
  });

  it('should handle font size with extra whitespace', () => {
    window.getComputedStyle = vi.fn(() => ({ 'font-size': '  18px  ' }) as unknown as CSSStyleDeclaration);
    const result = getElementFontSize(testElement);
    expect(result).toBe(DEFAULT_FONT_SIZE);
  });
});
