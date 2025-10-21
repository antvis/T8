import { readFileSync } from 'fs';
import path from 'path';
import Ajv from 'ajv';
import { restore } from '../example/utils';
import { NarrativeTextSpec } from '../src/schema/structure';

// Compressed structure helper types used only in test generation
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
export type CompressedPhrase = CompressedPhraseBase;

interface CompressedBulletItem {
  p: { dt: number; i: CompressedPhrase[] };
  bs?: { dt: number; i: CompressedBulletItem[]; io?: boolean };
}
interface CompressedBulletsParagraph {
  t: 11;
  b: { dt: number; i: CompressedBulletItem[]; io?: boolean };
}
interface CompressedNormalOrHeadingParagraph {
  t: number;
  dt: number;
  i: CompressedPhrase[];
}
export type CompressedParagraph = CompressedBulletsParagraph | CompressedNormalOrHeadingParagraph;

interface CompressedSectionParagraphContainer {
  pa: { dt: number; i: CompressedParagraph[] };
}
interface CompressedCustomSection {
  ct: string;
}
export type CompressedSection = CompressedSectionParagraphContainer | CompressedCustomSection;

interface CompressedRoot {
  h: { dt: number; i: CompressedPhrase[] };
  s: { dt: number; i: CompressedSection[] };
}

// Load schema
const schemaPath = path.resolve(__dirname, '../schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

// interface GenOptions { count: number }

// Pools (subset chosen to stay within schema constraints):
// Phrase types including custom(3) now; when generating custom we add metadata.customType
// const PHRASE_TYPES = [1, 2, 3];
// Paragraph types: normal(10), bullets(11), heading1..heading6 (12..17)
const PARAGRAPH_TYPES = [10, 11, 12, 13, 14, 15, 16, 17];
// Entity types full set (mapped correctly by restore)
const ENTITY_TYPES = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
// Assessments limited to schema enum (positive, negative, equal) -> codes p,n,e
const ASSESSMENTS = ['p', 'n', 'e'];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function chance(p: number): boolean {
  return Math.random() < p;
}

// Generate compressed phrase object
function genCompressedPhrase(defaultTypeCode: number): CompressedPhrase {
  // Decide if we emit explicit type override or rely on default dt
  const emitEntity = chance(0.3); // proportion of entity phrases
  const emitCustom = !emitEntity && chance(0.1); // small custom proportion
  const phrase: CompressedPhrase = { v: randomText() };
  if (emitEntity) {
    phrase.t = 2; // entity
    const meta: CompressedPhraseEntityMeta = { et: rand(ENTITY_TYPES) };
    if (chance(0.4)) meta.o = String((Math.random() * 100).toFixed(2));
    if (chance(0.3)) meta.a = rand(ASSESSMENTS); // positive/negative/equal
    phrase.m = meta;
  } else if (emitCustom) {
    phrase.t = 3; // custom
    phrase.m = { ct: `c_${rand(['x', 'y', 'z', 'k'])}` }; // metadata customType key 'ct' -> 'customType'
  } else if (chance(0.25) && defaultTypeCode !== 1) {
    phrase.t = 1;
  }
  return phrase;
}

function randomText(): string {
  const words = ['alpha', 'beta', 'gamma', 'delta', 'metric', 'value', 'trend', 'ratio', 'increase', 'decrease'];
  const len = 1 + Math.floor(Math.random() * 4);
  return Array.from({ length: len }, () => rand(words)).join(' ');
}

// Generate compressed paragraph using dt/i pattern
function genCompressedParagraph(): CompressedParagraph {
  const tCode = rand(PARAGRAPH_TYPES);
  if (tCode === 11) {
    // bullets paragraph via b container
    return {
      t: 11,
      b: {
        dt: 32, // bullet-item default
        i: Array.from({ length: 1 + Math.floor(Math.random() * 4) }, genCompressedBulletItem),
        io: chance(0.5),
      },
    };
  }
  const phraseDefault = 1; // default to text for simplicity
  // Introduce chance of empty paragraph (should be pruned by restore validation)
  const phraseCount = chance(0.05) ? 0 : 1 + Math.floor(Math.random() * 5);
  const phrases = Array.from({ length: phraseCount }, () => genCompressedPhrase(phraseDefault));
  return { t: tCode, dt: phraseDefault, i: phrases };
}

function genCompressedBulletItem(): CompressedBulletItem {
  const phraseDefault = 1; // text
  const phraseCount = chance(0.08) ? 0 : 1 + Math.floor(Math.random() * 4);
  const item: CompressedBulletItem = {
    p: { dt: phraseDefault, i: Array.from({ length: phraseCount }, () => genCompressedPhrase(phraseDefault)) },
  };
  // Optional nested subBullet structure (bs) with own bullet-item list
  if (chance(0.15)) {
    item.bs = {
      dt: 32,
      i: Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => ({
        p: { dt: phraseDefault, i: [genCompressedPhrase(phraseDefault)] },
      })),
      io: chance(0.5),
    };
  }
  return item;
}

// Generate sections compressed form
function genCompressedSection(): CompressedSection {
  // Occasionally produce a custom block section instead of normal paragraphs
  if (chance(0.05)) {
    return { ct: `sec_${rand(['a', 'b', 'c'])}` }; // custom block section with customType
  }
  const paragraphs = Array.from({ length: 1 + Math.floor(Math.random() * 4) }, genCompressedParagraph);
  return { pa: { dt: 10, i: paragraphs } };
}

// Generate root compressed narrative
function genCompressedRoot(): CompressedRoot {
  const phraseDefault = 1; // text
  const headline = {
    dt: phraseDefault,
    i: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => genCompressedPhrase(phraseDefault)),
  };
  const sections = { dt: 31, i: Array.from({ length: 1 + Math.floor(Math.random() * 3) }, genCompressedSection) };
  return { h: headline, s: sections };
}

function generateBatch(count: number): CompressedRoot[] {
  return Array.from({ length: count }, genCompressedRoot);
}

function computeSuccessRatio(cases: CompressedRoot[]): {
  success: number;
  total: number;
  ratio: number;
  errors: string[];
} {
  let success = 0;
  const errors: string[] = [];
  for (let i = 0; i < cases.length; i++) {
    const restored = restore(cases[i], { strict: true }) as NarrativeTextSpec;
    const valid = validate(restored);
    if (valid) success++;
    else errors.push(`Case ${i} errors: ${ajv.errorsText(validate.errors)}`);
  }
  return { success, total: cases.length, ratio: success / cases.length, errors };
}

// Vitest benchmark-style test
describe('restore benchmark', () => {
  const COUNT = 200; // adjust for speed vs coverage
  const batch = generateBatch(COUNT);
  const { ratio, errors } = computeSuccessRatio(batch);
  test(`success ratio >= 0.9 (actual ${(ratio * 100).toFixed(2)}%)`, () => {
    if (ratio < 0.9) {
      // Output a few errors for debugging
      console.error('Sample errors:', errors.slice(0, 5));
    }
    expect(ratio).toBeGreaterThanOrEqual(0.9);
  });
});
