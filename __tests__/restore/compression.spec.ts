import { describe, it, expect } from 'vitest';
import { restore } from '../../example/utils';
import type { NarrativeTextSpec } from '../../src';
import { generateTestDataset } from './test-utils';

// Simple normal distribution fit (mean & std) for savings ratio
function computeStats(values: number[]) {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((a, b) => a + (b - mean) * (b - mean), 0) / n;
  const std = Math.sqrt(variance);
  return { mean, std };
}

function buildHistogram(values: number[], binSize = 0.05) {
  const bins: { range: [number, number]; count: number }[] = [];
  for (let start = 0; start < 1 + 1e-8; start += binSize) {
    const end = Math.min(start + binSize, 1);
    bins.push({ range: [Number(start.toFixed(2)), Number(end.toFixed(2))], count: 0 });
  }
  for (const v of values) {
    const binIndex = Math.min(Math.floor(v / binSize), bins.length - 1);
    if (binIndex >= 0) bins[binIndex].count++;
  }
  return bins;
}

function rateOfGain(values: number[]) {
  if (values.length === 0) return 0;
  const above40 = values.filter((v) => v > 0.4).length;
  return above40 / values.length;
}

describe('restore - compression', () => {
  it('monte carlo compression', () => {
    const N = 500;
    const batch = generateTestDataset(N);
    const savings = batch.map((compressed) => {
      const restored = restore(compressed) as NarrativeTextSpec;
      return 1 - JSON.stringify(compressed).length / JSON.stringify(restored).length; // savings ratio
    });

    const stats = computeStats(savings);
    const hist = buildHistogram(savings);
    const highGainRate = rateOfGain(savings);

    console.log(`Compression stats over ${N} samples:`);
    console.log(`  Mean savings: ${(stats.mean * 100).toFixed(2)}%`);
    console.log(`  Std dev: ${(stats.std * 100).toFixed(2)}%`);
    console.log(`  High-gain rate (>40%): ${(highGainRate * 100).toFixed(2)}%`);

    // Show histogram for distribution insight
    console.log('Histogram:');
    hist.forEach(({ range, count }) => {
      if (count > 0) {
        const bar = '▓'.repeat(Math.ceil((count / N) * 50));
        console.log(`  ${(range[0] * 100).toFixed(0)}-${(range[1] * 100).toFixed(0)}%: ${bar} (${count})`);
      }
    });

    expect(stats.mean).toBeGreaterThan(0.1); // At least 10% average savings
    expect(stats.mean).toBeLessThan(0.8); // But not too extreme
    expect(highGainRate).toBeGreaterThan(0.7); // At least 70% samples have good compression (>40%)
  });

  it('compression ratio calculation for different cases', () => {
    const results: Record<string, number> = {};

    // Test different scenarios
    const testCases = [
      { name: 'simple', size: 10 },
      { name: 'medium', size: 50 },
      { name: 'complex', size: 100 },
    ];

    testCases.forEach(({ name, size }) => {
      const samples = generateTestDataset(size);
      const compressionRatios = samples.map((compressed) => {
        const restored = restore(compressed) as NarrativeTextSpec;
        return JSON.stringify(compressed).length / JSON.stringify(restored).length;
      });

      const avgRatio = compressionRatios.reduce((a, b) => a + b, 0) / compressionRatios.length;
      results[name] = avgRatio;
    });

    // Verify compression is effective
    Object.values(results).forEach((ratio) => {
      expect(ratio).toBeGreaterThan(0);
      expect(ratio).toBeLessThan(0.8);
    });
  });
});
