import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { restore } from '../example/utils';
import { NarrativeTextSpec } from '../src/schema/structure';

// Reuse compressed generation types from benchmark (local simplified re-definitions)
interface CompressedPhraseEntityMeta {
  et: number;
  o?: string;
  a?: string;
}
interface CompressedPhraseCustomMeta {
  ct: string;
}
interface CompressedPhraseBase {
  v: string;
  t?: number;
  m?: CompressedPhraseEntityMeta | CompressedPhraseCustomMeta;
}
interface CompressedBulletItem {
  p: { dt: number; i: CompressedPhraseBase[] };
  bs?: { dt: number; i: CompressedBulletItem[]; io?: boolean };
}
interface CompressedBulletsParagraph {
  t: 11;
  b: { dt: number; i: CompressedBulletItem[]; io?: boolean };
}
interface CompressedNormalOrHeadingParagraph {
  t: number;
  dt: number;
  i: CompressedPhraseBase[];
}
interface CompressedSectionParagraphContainer {
  pa: { dt: number; i: (CompressedBulletsParagraph | CompressedNormalOrHeadingParagraph)[] };
}
interface CompressedCustomSection {
  ct: string;
}
interface CompressedRoot {
  h: { dt: number; i: CompressedPhraseBase[] };
  s: { dt: 31; i: (CompressedSectionParagraphContainer | CompressedCustomSection)[] };
}

const PARAGRAPH_TYPES = [10, 11, 12, 13, 14, 15, 16, 17];
const ENTITY_TYPES = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
const ASSESSMENTS = ['p', 'n', 'e'];
function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function chance(p: number): boolean {
  return Math.random() < p;
}

function genCompressedPhrase(): CompressedPhraseBase {
  const phrase: CompressedPhraseBase = { v: randomText() };
  if (chance(0.25)) {
    // entity
    phrase.t = 2;
    const meta: CompressedPhraseEntityMeta = { et: rand(ENTITY_TYPES) };
    if (chance(0.4)) meta.o = String((Math.random() * 100).toFixed(2));
    if (chance(0.3)) meta.a = rand(ASSESSMENTS);
    phrase.m = meta;
  } else if (chance(0.1)) {
    // custom
    phrase.t = 3;
    phrase.m = { ct: `c_${rand(['x', 'y', 'z'])}` };
  }
  return phrase;
}

function randomText(): string {
  const words = ['alpha', 'beta', 'gamma', 'delta', 'metric', 'value', 'trend', 'ratio', 'increase', 'decrease'];
  const len = 1 + Math.floor(Math.random() * 4);
  return Array.from({ length: len }, () => rand(words)).join(' ');
}

function genCompressedParagraph(): CompressedBulletsParagraph | CompressedNormalOrHeadingParagraph {
  const tCode = rand(PARAGRAPH_TYPES);
  if (tCode === 11) {
    return {
      t: 11,
      b: {
        dt: 32,
        i: Array.from({ length: 1 + Math.floor(Math.random() * 4) }, genCompressedBulletItem),
        io: chance(0.5),
      },
    };
  }
  const phraseCount = chance(0.05) ? 0 : 1 + Math.floor(Math.random() * 5);
  const phrases = Array.from({ length: phraseCount }, () => genCompressedPhrase());
  return { t: tCode, dt: 1, i: phrases };
}

function genCompressedBulletItem(): CompressedBulletItem {
  const phraseCount = chance(0.1) ? 0 : 1 + Math.floor(Math.random() * 4);
  const item: CompressedBulletItem = {
    p: { dt: 1, i: Array.from({ length: phraseCount }, () => genCompressedPhrase()) },
  };
  if (chance(0.15)) {
    item.bs = {
      dt: 32,
      i: Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => ({
        p: { dt: 1, i: [genCompressedPhrase()] },
      })),
      io: chance(0.5),
    };
  }
  return item;
}

function genCompressedSection(): CompressedSectionParagraphContainer | CompressedCustomSection {
  if (chance(0.05)) return { ct: `sec_${rand(['a', 'b', 'c'])}` };
  return { pa: { dt: 10, i: Array.from({ length: 1 + Math.floor(Math.random() * 4) }, genCompressedParagraph) } };
}

function genCompressedRoot(): CompressedRoot {
  return {
    h: { dt: 1, i: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => genCompressedPhrase()) },
    s: { dt: 31, i: Array.from({ length: 1 + Math.floor(Math.random() * 3) }, genCompressedSection) },
  };
}

function generateBatch(n: number): CompressedRoot[] {
  return Array.from({ length: n }, genCompressedRoot);
}

// Simple normal distribution fit (mean & std) for savings ratio
function computeStats(values: number[]) {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((a, b) => a + (b - mean) * (b - mean), 0) / n;
  const std = Math.sqrt(variance);
  return { mean, std };
}

// z-score utility
function zScores(values: number[], mean: number, std: number) {
  return values.map((v) => (std === 0 ? 0 : (v - mean) / std));
}

function buildHistogram(values: number[], binSize = 0.05) {
  const bins: { range: [number, number]; count: number }[] = [];
  for (let start = 0; start < 1 + 1e-8; start += binSize) {
    const end = Math.min(start + binSize, 1);
    bins.push({ range: [Number(start.toFixed(2)), Number(end.toFixed(2))], count: 0 });
  }
  for (const v of values) {
    const idx = Math.min(Math.floor(v / binSize), bins.length - 1);
    bins[idx].count++;
  }
  return bins;
}

describe('compression report', () => {
  const COUNT = 200;
  const batch = generateBatch(COUNT);
  const savingsRatios: number[] = [];
  const lengths: { compressed: number; restored: number; diff: number; ratio: number }[] = [];

  for (const c of batch) {
    const compressedStr = JSON.stringify(c);
    const restored = restore(c, { strict: true }) as NarrativeTextSpec;
    const restoredStr = JSON.stringify(restored);
    const compressedLen = compressedStr.length;
    const restoredLen = restoredStr.length;
    const diff = restoredLen - compressedLen;
    const ratio = diff / restoredLen; // percentage saved relative to restored size
    savingsRatios.push(ratio);
    lengths.push({ compressed: compressedLen, restored: restoredLen, diff, ratio });
  }

  const { mean, std } = computeStats(savingsRatios);
  const zs = zScores(savingsRatios, mean, std);
  const histogram = buildHistogram(savingsRatios);

  test('average compression ratio positive', () => {
    expect(mean).toBeGreaterThan(0); // we save some bytes on average
  });

  test('compression ratio distribution stats', () => {
    // Ensure reasonable spread (std not zero) unless trivial data
    expect(std).toBeGreaterThan(0);
    // All ratios should be between 0 and 1 (we do not expand beyond original restored length by definition of ratio)
    expect(savingsRatios.every((r) => r >= 0 && r <= 1)).toBe(true);
  });

  test('histogram coverage', () => {
    const total = histogram.reduce((a, b) => a + b.count, 0);
    expect(total).toBe(savingsRatios.length);
    // At least one non-empty bin
    expect(histogram.some((b) => b.count > 0)).toBe(true);
  });

  test('report snapshot', () => {
    // Provide a lightweight textual report (could be extended to histogram later)
    const min = Math.min(...savingsRatios);
    const max = Math.max(...savingsRatios);
    const median = [...savingsRatios].sort((a, b) => a - b)[Math.floor(savingsRatios.length / 2)];
    const report = {
      count: COUNT,
      mean: Number(mean.toFixed(4)),
      std: Number(std.toFixed(4)),
      min: Number(min.toFixed(4)),
      max: Number(max.toFixed(4)),
      median: Number(median.toFixed(4)),
      example: lengths.slice(0, 5),
      sampleZScores: zs.slice(0, 5).map((z) => Number(z.toFixed(3))),
      histogram: histogram.map((h) => ({ range: h.range, count: h.count })),
    };
    // Export visualization artifacts (json + markdown)
    const outDir = path.resolve(__dirname, '../dist-reports');
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, 'compression-report.json'), JSON.stringify(report, null, 2), 'utf-8');
    // Simple markdown table for histogram
    const mdLines = [
      '# Compression Histogram Report',
      '',
      `Total Cases: ${report.count}`,
      `Mean Ratio: ${(report.mean * 100).toFixed(2)}%`,
      `Std Dev: ${(report.std * 100).toFixed(2)}%`,
      '',
      '| Bin Range | Count | Percent |',
      '|-----------|-------|---------|',
      ...report.histogram.map((b) => {
        // const width = (b.range[1]-b.range[0]);
        const pct = ((b.count / report.count) * 100).toFixed(2) + '%';
        return `| ${b.range[0].toFixed(2)} - ${b.range[1].toFixed(2)} | ${b.count} | ${pct} |`;
      }),
      '',
      'Sample Cases (first 5):',
      '```json',
      JSON.stringify(report.example, null, 2),
      '```',
    ];
    writeFileSync(path.join(outDir, 'compression-histogram.md'), mdLines.join('\n'), 'utf-8');
    expect(report.mean).toBeGreaterThan(0);
    expect(report.max).toBeGreaterThanOrEqual(report.min);
  });
});
