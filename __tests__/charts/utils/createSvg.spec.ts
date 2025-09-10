import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createSvg } from '../../../src/charts/utils/createSvg';
import { Selection } from '../../../src/charts/utils/selection';

describe('createSvg', () => {
  let testContainer: HTMLDivElement;

  beforeEach(() => {
    testContainer = document.createElement('div');
    document.body.appendChild(testContainer);
  });

  afterEach(() => {
    document.body.removeChild(testContainer);
  });

  it('should create and return a Selection object', () => {
    const result = createSvg(testContainer, 100, 200);
    expect(result).toBeInstanceOf(Selection);
  });

  it('should create SVG element with correct dimensions', () => {
    const selection = createSvg(testContainer, 150, 300);
    const svg = selection.node() as SVGElement;

    expect(svg.tagName).toBe('svg');
    expect(svg.getAttribute('width')).toBe('150');
    expect(svg.getAttribute('height')).toBe('300');
  });

  it('should append SVG to the provided container', () => {
    const selection = createSvg(testContainer, 100, 200);
    const svg = selection.node();

    expect(testContainer.contains(svg)).toBe(true);
    expect(testContainer.children.length).toBe(1);
    expect(testContainer.children[0]).toBe(svg);
  });

  it('should set correct styling on SVG element', () => {
    const selection = createSvg(testContainer, 100, 200);
    const svg = selection.node() as HTMLElement;

    expect(svg.style.margin).toBe('0px 4px');
    expect(svg.style.transform).toBe('translate(0px, 0.125em)');
  });

  it('should create SVG in proper namespace', () => {
    const selection = createSvg(testContainer, 100, 200);
    const svg = selection.node();

    expect(svg?.namespaceURI).toBe('http://www.w3.org/2000/svg');
  });

  it('should handle zero dimensions', () => {
    const selection = createSvg(testContainer, 0, 0);
    const svg = selection.node() as SVGElement;

    expect(svg.getAttribute('width')).toBe('0');
    expect(svg.getAttribute('height')).toBe('0');
  });

  it('should handle decimal dimensions', () => {
    const selection = createSvg(testContainer, 100.5, 200.7);
    const svg = selection.node() as SVGElement;

    expect(svg.getAttribute('width')).toBe('100.5');
    expect(svg.getAttribute('height')).toBe('200.7');
  });

  it('should handle large dimensions', () => {
    const selection = createSvg(testContainer, 9999, 8888);
    const svg = selection.node() as SVGElement;

    expect(svg.getAttribute('width')).toBe('9999');
    expect(svg.getAttribute('height')).toBe('8888');
  });

  it('should work with different container types', () => {
    const spanContainer = document.createElement('span');
    document.body.appendChild(spanContainer);

    try {
      const selection = createSvg(spanContainer, 100, 200);
      const svg = selection.node();

      expect(spanContainer.contains(svg)).toBe(true);
      expect(svg?.tagName).toBe('svg');
    } finally {
      document.body.removeChild(spanContainer);
    }
  });

  it('should allow multiple SVGs in the same container', () => {
    const selection1 = createSvg(testContainer, 100, 200);
    const selection2 = createSvg(testContainer, 150, 250);

    expect(testContainer.children.length).toBe(2);
    expect(testContainer.contains(selection1.node())).toBe(true);
    expect(testContainer.contains(selection2.node())).toBe(true);
  });

  it('should return selection that can be further manipulated', () => {
    const selection = createSvg(testContainer, 100, 200);

    // Test that the returned selection can be used for further operations
    const rectSelection = selection.append('rect');
    const rect = rectSelection.node();

    expect(rect?.tagName).toBe('rect');
    expect(selection.node()?.contains(rect)).toBe(true);
  });

  it('should handle negative dimensions gracefully', () => {
    const selection = createSvg(testContainer, -100, -200);
    const svg = selection.node() as SVGElement;

    // SVG should still be created, even with negative dimensions
    expect(svg.tagName).toBe('svg');
    expect(svg.getAttribute('width')).toBe('-100');
    expect(svg.getAttribute('height')).toBe('-200');
  });

  it('should maintain consistent styling across multiple creations', () => {
    const selection1 = createSvg(testContainer, 100, 200);
    const selection2 = createSvg(testContainer, 150, 250);

    const svg1 = selection1.node() as HTMLElement;
    const svg2 = selection2.node() as HTMLElement;

    expect(svg1.style.margin).toBe(svg2.style.margin);
    expect(svg1.style.transform).toBe(svg2.style.transform);
  });
});
