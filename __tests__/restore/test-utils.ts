// 共享的测试工具类型定义和生成函数
// 用于 restore 相关测试的通用数据生成和验证功能

import { readFileSync } from 'fs';
import path from 'path';
import Ajv, { ValidateFunction } from 'ajv';

// ================== 共享类型定义 ==================

export interface CompressedPhraseEntityMeta {
  et: number;
  o?: string;
  a?: string;
}

export interface CompressedPhraseCustomMeta {
  ct: string;
}

export interface CompressedPhraseBase {
  v: string;
  t?: number;
  m?: CompressedPhraseEntityMeta | CompressedPhraseCustomMeta;
}

export type CompressedPhrase = CompressedPhraseBase;

export interface CompressedBulletItem {
  p: { dt: number; i: CompressedPhrase[] };
  bs?: { dt: number; i: CompressedBulletItem[]; io?: boolean };
}

export interface CompressedBulletsParagraph {
  t: 11;
  b: { dt: number; i: CompressedBulletItem[]; io?: boolean };
}

export interface CompressedNormalOrHeadingParagraph {
  t: number;
  dt: number;
  i: CompressedPhrase[];
}

export type CompressedParagraph = CompressedBulletsParagraph | CompressedNormalOrHeadingParagraph;

export interface CompressedSectionParagraphContainer {
  pa: { dt: number; i: CompressedParagraph[] };
}

export interface CompressedCustomSection {
  ct: string;
}

export type CompressedSection = CompressedSectionParagraphContainer | CompressedCustomSection;

export interface CompressedRoot {
  h: { dt: number; i: CompressedPhrase[] };
  s: { dt: number; i: CompressedSection[] };
}

// ================== 共享常量 ==================

// 段落类型: normal(10), bullets(11), heading1..heading6 (12..17)
export const PARAGRAPH_TYPES = [10, 11, 12, 13, 14, 15, 16, 17];

// 实体类型完整集合 (20-29)
export const ENTITY_TYPES = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

// Assessment 枚举值，限制为 schema.json 中定义的值
export const ASSESSMENTS = ['p', 'n', 'e']; // positive, negative, equal

// 短语类型
export const PHRASE_TYPES = [1, 2, 3]; // text, entity, custom

// ================== 共享工具函数 ==================

/**
 * 从数组中随机选择一个元素
 */
export function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 以指定概率返回 true
 */
export function chance(p: number): boolean {
  return Math.random() < p;
}

/**
 * 生成随机文本内容
 */
export function randomText(): string {
  const words = [
    'alpha',
    'beta',
    'gamma',
    'delta',
    'metric',
    'value',
    'trend',
    'ratio',
    'increase',
    'decrease',
    '营收',
    '利润',
    '增长',
    '下降',
    '指标',
    '数据',
    '分析',
    '报告',
    '总结',
    '业绩',
    '市场',
    '用户',
    '产品',
    '服务',
  ];
  const len = 1 + Math.floor(Math.random() * 4);
  return Array.from({ length: len }, () => rand(words)).join(' ');
}

/**
 * 生成随机数字字符串
 */
export function randomNumberString(): string {
  return (Math.random() * 1000).toFixed(2);
}

// ================== Schema 验证相关 ==================

let cachedValidator: ValidateFunction | null = null;

/**
 * 获取 schema 验证器（单例模式）
 */
export function getSchemaValidator(): ValidateFunction {
  if (!cachedValidator) {
    const schemaPath = path.resolve(__dirname, '../../schema.json');
    const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
    const ajv = new Ajv({ allErrors: true, strict: false });
    cachedValidator = ajv.compile(schema);
  }
  return cachedValidator;
}

/**
 * 验证数据是否符合 schema
 */
export function validateSchema(data: unknown): { isValid: boolean; errors?: unknown[] } {
  const validator = getSchemaValidator();
  const isValid = validator(data);
  return {
    isValid,
    errors: isValid ? undefined : validator.errors,
  };
}

// ================== 压缩数据生成器 ==================

/**
 * 生成压缩格式的短语对象
 */
export function generateCompressedPhrase(options: {
  defaultTypeCode?: number;
  entityChance?: number;
  customChance?: number;
  metadataChance?: { origin?: number; assessment?: number };
}): CompressedPhrase {
  const {
    defaultTypeCode = 1,
    entityChance = 0.3,
    customChance = 0.1,
    metadataChance = { origin: 0.4, assessment: 0.3 },
  } = options;

  const emitEntity = chance(entityChance);
  const emitCustom = !emitEntity && chance(customChance);

  const phrase: CompressedPhrase = { v: randomText() };

  if (emitEntity) {
    phrase.t = 2; // entity
    const meta: CompressedPhraseEntityMeta = { et: rand(ENTITY_TYPES) };
    if (chance(metadataChance.origin || 0.4)) {
      meta.o = randomNumberString();
    }
    if (chance(metadataChance.assessment || 0.3)) {
      meta.a = rand(ASSESSMENTS);
    }
    phrase.m = meta;
  } else if (emitCustom) {
    phrase.t = 3; // custom
    phrase.m = { ct: `custom_${rand(['type_a', 'type_b', 'type_c'])}` };
  } else if (chance(0.25) && defaultTypeCode !== 1) {
    phrase.t = 1; // explicit text type
  }

  return phrase;
}

/**
 * 生成压缩格式的短语数组
 */
export function generateCompressedPhrases(
  count: number,
  options?: Parameters<typeof generateCompressedPhrase>[0],
): CompressedPhrase[] {
  return Array.from({ length: count }, () => generateCompressedPhrase(options || {}));
}

/**
 * 生成压缩格式的段落
 */
export function generateCompressedParagraph(options: {
  allowedTypes?: number[];
  phrasesCount?: { min: number; max: number };
  bulletsCount?: { min: number; max: number };
}): CompressedParagraph {
  const {
    allowedTypes = PARAGRAPH_TYPES,
    phrasesCount = { min: 1, max: 5 },
    bulletsCount = { min: 1, max: 3 },
  } = options;

  const type = rand(allowedTypes);

  if (type === 11) {
    // bullets 段落
    const bulletCount = Math.floor(Math.random() * (bulletsCount.max - bulletsCount.min + 1)) + bulletsCount.min;
    const bullets: CompressedBulletItem[] = [];

    for (let i = 0; i < bulletCount; i++) {
      const phraseCount = Math.floor(Math.random() * (phrasesCount.max - phrasesCount.min + 1)) + phrasesCount.min;
      bullets.push({
        p: { dt: 1, i: generateCompressedPhrases(phraseCount) },
        ...(Math.random() > 0.8 && { t: 32 }), // 偶尔显式指定 bullet-item 类型
      });
    }

    return {
      t: 11,
      b: {
        dt: 32,
        i: bullets,
        io: chance(0.5),
      },
    };
  } else {
    // normal 或 heading 段落
    const phraseCount = Math.floor(Math.random() * (phrasesCount.max - phrasesCount.min + 1)) + phrasesCount.min;
    return {
      t: type,
      dt: 1,
      i: generateCompressedPhrases(phraseCount),
    };
  }
}

/**
 * 生成压缩格式的 section
 */
export function generateCompressedSection(options: {
  paragraphsCount?: { min: number; max: number };
  allowCustomSection?: boolean;
}): CompressedSection {
  const { paragraphsCount = { min: 1, max: 4 }, allowCustomSection = false } = options;

  if (allowCustomSection && chance(0.1)) {
    return { ct: `custom_section_${rand(['A', 'B', 'C'])}` };
  }

  const paragraphCount =
    Math.floor(Math.random() * (paragraphsCount.max - paragraphsCount.min + 1)) + paragraphsCount.min;
  const paragraphs: CompressedParagraph[] = [];

  for (let i = 0; i < paragraphCount; i++) {
    paragraphs.push(generateCompressedParagraph({}));
  }

  return {
    pa: { dt: 10, i: paragraphs },
  };
}

/**
 * 生成完整的压缩格式文档
 */
export function generateCompressedDocument(options: {
  sectionsCount?: { min: number; max: number };
  headlinePhrases?: number;
  allowCustomSection?: boolean;
}): CompressedRoot {
  const { sectionsCount = { min: 1, max: 3 }, headlinePhrases = 1, allowCustomSection = false } = options;

  const sectionCount = Math.floor(Math.random() * (sectionsCount.max - sectionsCount.min + 1)) + sectionsCount.min;
  const sections: CompressedSection[] = [];

  for (let i = 0; i < sectionCount; i++) {
    sections.push(generateCompressedSection({ allowCustomSection }));
  }

  return {
    h: { dt: 30, i: generateCompressedPhrases(headlinePhrases) },
    s: { dt: 31, i: sections },
  };
}

// ================== 测试辅助函数 ==================

/**
 * 计算压缩率
 */
export function calculateCompressionRatio(original: unknown, compressed: unknown): number {
  const originalSize = JSON.stringify(original).length;
  const compressedSize = JSON.stringify(compressed).length;
  return (originalSize - compressedSize) / originalSize;
}

/**
 * 生成测试数据集
 */
export function generateTestDataset(
  count: number,
  options?: Parameters<typeof generateCompressedDocument>[0],
): CompressedRoot[] {
  return Array.from({ length: count }, () => generateCompressedDocument(options || {}));
}

/**
 * 批量验证测试数据
 */
export function validateTestDataset(dataset: unknown[]): {
  passRate: number;
  failures: Array<{ index: number; errors: unknown[] }>;
} {
  const failures: Array<{ index: number; errors: unknown[] }> = [];

  dataset.forEach((data, index) => {
    const { isValid, errors } = validateSchema(data);
    if (!isValid) {
      failures.push({ index, errors: errors || [] });
    }
  });

  return {
    passRate: (dataset.length - failures.length) / dataset.length,
    failures,
  };
}
