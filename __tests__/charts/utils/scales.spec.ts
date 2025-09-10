import { describe, it, expect } from 'vitest';
import { scaleLinear } from '../../../src/charts/utils/scales';

describe('scales', () => {
  describe('scaleLinear', () => {
    it('should create a linear scale function', () => {
      const scale = scaleLinear([0, 10], [0, 100]);
      expect(typeof scale).toBe('function');
    });

    it('should map domain values to range values correctly', () => {
      const scale = scaleLinear([0, 10], [0, 100]);
      expect(scale(0)).toBe(0);
      expect(scale(5)).toBe(50);
      expect(scale(10)).toBe(100);
    });

    it('should handle negative domain values', () => {
      const scale = scaleLinear([-10, 10], [0, 100]);
      expect(scale(-10)).toBe(0);
      expect(scale(0)).toBe(50);
      expect(scale(10)).toBe(100);
    });

    it('should handle negative range values', () => {
      const scale = scaleLinear([0, 10], [-50, 50]);
      expect(scale(0)).toBe(-50);
      expect(scale(5)).toBe(0);
      expect(scale(10)).toBe(50);
    });

    it('should handle values outside domain', () => {
      const scale = scaleLinear([0, 10], [0, 100]);
      expect(scale(-5)).toBe(-50);
      expect(scale(15)).toBe(150);
    });

    it('should handle decimal values', () => {
      const scale = scaleLinear([0, 1], [0, 100]);
      expect(scale(0.25)).toBe(25);
      expect(scale(0.75)).toBe(75);
    });

    it('should return range start when domain is a single point', () => {
      const scale = scaleLinear([5, 5], [0, 100]);
      expect(scale(5)).toBe(0);
      expect(scale(10)).toBe(0);
      expect(scale(0)).toBe(0);
    });

    it('should return range start when range is a single point', () => {
      const scale = scaleLinear([0, 10], [50, 50]);
      expect(scale(0)).toBe(50);
      expect(scale(5)).toBe(50);
      expect(scale(10)).toBe(50);
    });

    it('should handle reversed domain', () => {
      const scale = scaleLinear([10, 0], [0, 100]);
      expect(scale(10)).toBe(0);
      expect(scale(5)).toBe(50);
      expect(scale(0)).toBe(100);
    });

    it('should handle reversed range', () => {
      const scale = scaleLinear([0, 10], [100, 0]);
      expect(scale(0)).toBe(100);
      expect(scale(5)).toBe(50);
      expect(scale(10)).toBe(0);
    });
  });
});
