import { describe, it, expect } from 'vitest';
import { line, area, arc, arrow } from '../../../src/charts/utils/paths';

describe('paths', () => {
  const mockXScale = (n: number) => n * 10;
  const mockYScale = (n: number) => n * 5;
  const height = 100;

  describe('line', () => {
    it('should create a line generator function', () => {
      const lineGenerator = line(mockXScale, mockYScale, height);
      expect(typeof lineGenerator).toBe('function');
    });

    it('should return empty string for empty data', () => {
      const lineGenerator = line(mockXScale, mockYScale, height);
      expect(lineGenerator([])).toBe('');
    });

    it('should generate correct SVG path for single point', () => {
      const lineGenerator = line(mockXScale, mockYScale, height);
      const result = lineGenerator([10]);
      expect(result).toBe('M0 50'); // M(0*10) (100-10*5)
    });

    it('should generate correct SVG path for multiple points', () => {
      const lineGenerator = line(mockXScale, mockYScale, height);
      const result = lineGenerator([10, 20, 15]);
      expect(result).toBe('M0 50 L10 0 L20 25'); // M(0*10) (100-10*5) L(1*10) (100-20*5) L(2*10) (100-15*5)
    });

    it('should handle zero values', () => {
      const lineGenerator = line(mockXScale, mockYScale, height);
      const result = lineGenerator([0, 5]);
      expect(result).toBe('M0 100 L10 75'); // M(0*10) (100-0*5) L(1*10) (100-5*5)
    });

    it('should handle negative values', () => {
      const lineGenerator = line(mockXScale, mockYScale, height);
      const result = lineGenerator([-10, 5]);
      expect(result).toBe('M0 150 L10 75'); // M(0*10) (100-(-10)*5) L(1*10) (100-5*5)
    });

    it('should handle decimal values', () => {
      const lineGenerator = line(mockXScale, mockYScale, height);
      const result = lineGenerator([2.5, 7.5]);
      expect(result).toBe('M0 87.5 L10 62.5'); // M(0*10) (100-2.5*5) L(1*10) (100-7.5*5)
    });
  });

  describe('area', () => {
    const y0 = 80;

    it('should create an area generator function', () => {
      const areaGenerator = area(mockXScale, mockYScale, y0);
      expect(typeof areaGenerator).toBe('function');
    });

    it('should return empty string for empty data', () => {
      const areaGenerator = area(mockXScale, mockYScale, y0);
      expect(areaGenerator([])).toBe('');
    });

    it('should generate correct SVG path for single point', () => {
      const areaGenerator = area(mockXScale, mockYScale, y0);
      const result = areaGenerator([10]);
      expect(result).toBe('M0 30 L0 80 L0 80'); // Area path with baseline
    });

    it('should generate correct SVG path for multiple points', () => {
      const areaGenerator = area(mockXScale, mockYScale, y0);
      const result = areaGenerator([10, 20]);
      expect(result).toBe('M0 30 L10 -20 L10 80 L0 80'); // Area path with baseline closure
    });

    it('should handle zero values', () => {
      const areaGenerator = area(mockXScale, mockYScale, y0);
      const result = areaGenerator([0, 5]);
      expect(result).toBe('M0 80 L10 55 L10 80 L0 80');
    });

    it('should handle negative values', () => {
      const areaGenerator = area(mockXScale, mockYScale, y0);
      const result = areaGenerator([-10]);
      expect(result).toBe('M0 130 L0 80 L0 80');
    });
  });

  describe('arc', () => {
    const radius = 50;

    it('should create an arc generator function', () => {
      const arcGenerator = arc(radius);
      expect(typeof arcGenerator).toBe('function');
    });

    it('should generate correct SVG path for small angle', () => {
      const arcGenerator = arc(radius);
      const result = arcGenerator(100, 100, Math.PI / 4); // 45 degrees
      const expectedDx = 100 + 50 * Math.sin(Math.PI / 4);
      const expectedDy = 100 - 50 * Math.cos(Math.PI / 4);
      expect(result).toBe(`M100 0 A100 100 0 0 1 ${expectedDx} ${expectedDy} L100 100 Z`);
    });

    it('should generate correct SVG path for large angle', () => {
      const arcGenerator = arc(radius);
      const result = arcGenerator(100, 100, Math.PI * 1.5); // 270 degrees
      const expectedDx = 100 + 50 * Math.sin(Math.PI * 1.5);
      const expectedDy = 100 - 50 * Math.cos(Math.PI * 1.5);
      expect(result).toBe(`M100 0 A100 100 0 1 1 ${expectedDx} ${expectedDy} L100 100 Z`);
    });

    it('should use large arc flag for angles > π', () => {
      const arcGenerator = arc(radius);
      const result = arcGenerator(100, 100, Math.PI + 0.1);
      expect(result).toContain('A100 100 0 1 1'); // Large arc flag should be 1
    });

    it('should use small arc flag for angles ≤ π', () => {
      const arcGenerator = arc(radius);
      const result = arcGenerator(100, 100, Math.PI);
      expect(result).toContain('A100 100 0 0 1'); // Large arc flag should be 0
    });

    it('should handle zero angle', () => {
      const arcGenerator = arc(radius);
      const result = arcGenerator(100, 100, 0);
      expect(result).toBe('M100 0 A100 100 0 0 1 100 50 L100 100 Z');
    });
  });

  describe('arrow', () => {
    const arrowheadLength = 5;
    const arrowheadWidth = 3;

    it('should create an arrow generator function', () => {
      const arrowGenerator = arrow(mockXScale, mockYScale, height, arrowheadLength, arrowheadWidth);
      expect(typeof arrowGenerator).toBe('function');
    });

    it('should generate correct SVG path for horizontal arrow', () => {
      const arrowGenerator = arrow(mockXScale, mockYScale, height, arrowheadLength, arrowheadWidth);
      const startData = { index: 0, value: 10 };
      const endData = { index: 2, value: 10 };
      const result = arrowGenerator(startData, endData);

      // Should contain move to start, line to base, and arrowhead
      expect(result).toContain('M5 50'); // Start point
      expect(result).toContain('L20 50'); // Base point
      expect(result).toContain('M25 50'); // End point
    });

    it('should generate correct SVG path for vertical arrow', () => {
      const arrowGenerator = arrow(mockXScale, mockYScale, height, arrowheadLength, arrowheadWidth);
      const startData = { index: 0, value: 10 };
      const endData = { index: 0, value: 20 };
      const result = arrowGenerator(startData, endData);

      expect(result).toContain('M5 50'); // Start point
      expect(result).toContain('M5 0'); // End point
    });

    it('should generate correct SVG path for diagonal arrow', () => {
      const arrowGenerator = arrow(mockXScale, mockYScale, height, arrowheadLength, arrowheadWidth);
      const startData = { index: 0, value: 10 };
      const endData = { index: 1, value: 20 };
      const result = arrowGenerator(startData, endData);

      expect(result).toContain('M5 50'); // Start point
      expect(result).toContain('M15 0'); // End point
    });

    it('should use default arrowhead dimensions when not provided', () => {
      const arrowGenerator = arrow(mockXScale, mockYScale, height);
      const startData = { index: 0, value: 10 };
      const endData = { index: 1, value: 10 };
      const result = arrowGenerator(startData, endData);

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle same start and end points', () => {
      const arrowGenerator = arrow(mockXScale, mockYScale, height, arrowheadLength, arrowheadWidth);
      const startData = { index: 1, value: 10 };
      const endData = { index: 1, value: 10 };
      const result = arrowGenerator(startData, endData);

      expect(result).toContain('M15 50'); // Same start and end
    });

    it('should handle negative values', () => {
      const arrowGenerator = arrow(mockXScale, mockYScale, height, arrowheadLength, arrowheadWidth);
      const startData = { index: 0, value: -5 };
      const endData = { index: 1, value: 5 };
      const result = arrowGenerator(startData, endData);

      expect(result).toContain('M5 125'); // Start point with negative value
      expect(result).toContain('M15 75'); // End point
    });
  });
});
