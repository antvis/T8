// -------------------- 解码映射常量 --------------------
const KEY_DECODER_MAP: { [shrunken: string]: string } = {
  t: 'type',
  v: 'value',
  m: 'metadata',
  et: 'entityType',
  a: 'assessment',
  o: 'origin',
  d: 'detail',
  sid: 'sourceId',
  c: 'chart',
  cfg: 'config',
  dat: 'data',
  r: 'range',
  h: 'headline',
  sc: 'sections',
  p: 'phrases',
  pa: 'paragraphs',
  ti: 'title',
  b: 'bullets',
  io: 'isOrder',
  sb: 'subBullet',
  ct: 'customType',
  isB: 'bold',
  isI: 'italic',
  isU: 'underline',
  url: 'url',
  dt: 'defaultType',
  i: 'items',
  sy: 'styles',
  // 核心结构体键名: h -> headline, s -> sections, p -> phrases, pa -> paragraphs
  s: 'sections',
};

// 类型值数字映射表
const PHRASE_TYPE_MAP: { [shrunken: number]: string } = { 1: 'text', 2: 'entity', 3: 'custom' };
const PARAGRAPH_TYPE_MAP: { [shrunken: number]: string } = {
  10: 'normal',
  11: 'bullets',
  12: 'heading1',
  13: 'heading2',
  14: 'heading3',
  15: 'heading4',
  16: 'heading5',
  17: 'heading6',
};
const ENTITY_TYPE_MAP: { [shrunken: number]: string } = {
  20: 'metric_name',
  21: 'metric_value',
  22: 'other_metric_value',
  23: 'contribute_ratio',
  24: 'delta_value',
  25: 'ratio_value',
  26: 'trend_desc',
  27: 'dim_value',
  28: 'time_desc',
  29: 'proportion',
};
const ASSESSMENT_MAP: { [shrunken: string]: string } = { p: 'positive', n: 'negative', e: 'equal', u: 'neutral' };
const HARDCODED_TYPE_MAP: { [shrunken: number]: string } = { 30: 'headline', 31: 'section', 32: 'bullet-item' };

// -------------------- 核心还原函数 --------------------
export function restoreJson(shrunkenData: unknown): unknown {
  if (typeof shrunkenData !== 'object' || shrunkenData === null) {
    return shrunkenData;
  }

  // 1. 结构优化还原 (dt/i -> Array)
  if (
    Object.prototype.hasOwnProperty.call(shrunkenData, 'dt') &&
    Object.prototype.hasOwnProperty.call(shrunkenData, 'i') &&
    Array.isArray((shrunkenData as Record<string, unknown>).i)
  ) {
    const shrunkenDefaultType = (shrunkenData as Record<string, unknown>).dt;
    const items = (shrunkenData as Record<string, unknown>).i as unknown[];

    // Step 1.1: 转换数字默认类型值
    let restoredDefaultType = shrunkenDefaultType;
    if (typeof shrunkenDefaultType === 'number') {
      restoredDefaultType =
        PHRASE_TYPE_MAP[shrunkenDefaultType] ||
        PARAGRAPH_TYPE_MAP[shrunkenDefaultType] ||
        HARDCODED_TYPE_MAP[shrunkenDefaultType] ||
        shrunkenDefaultType;
    }

    const restoredArray = items.map((item: unknown) => {
      const restoredItem = restoreJson(item) as Record<string, unknown>;

      // Step 1.2: 如果子项没有显式 type 键 (t)，则应用还原后的字符串默认类型
      if (!Object.prototype.hasOwnProperty.call(restoredItem, KEY_DECODER_MAP['t'])) {
        restoredItem[KEY_DECODER_MAP['t']] = restoredDefaultType;
      }
      return restoredItem;
    });

    return restoredArray;
  }

  // 2. 递归处理标准数组
  if (Array.isArray(shrunkenData)) {
    return shrunkenData.map((item) => restoreJson(item));
  }

  // 3. 处理普通对象：键名和值转换
  const restoredData: Record<string, unknown> = {};
  const objData = shrunkenData as Record<string, unknown>;

  for (const shrunkenKey in objData) {
    if (Object.prototype.hasOwnProperty.call(objData, shrunkenKey)) {
      // A. 恢复键名
      const originalKey = KEY_DECODER_MAP[shrunkenKey];

      // 仅处理在映射表中的键
      if (!originalKey) {
        continue;
      }

      const shrunkenValue = objData[shrunkenKey];
      let restoredValue: unknown = shrunkenValue;

      // B. 恢复值 (Value Decoding)
      if (originalKey === 'type' && typeof shrunkenValue === 'number') {
        restoredValue =
          PHRASE_TYPE_MAP[shrunkenValue] ||
          PARAGRAPH_TYPE_MAP[shrunkenValue] ||
          HARDCODED_TYPE_MAP[shrunkenValue] ||
          shrunkenValue;
      } else if (originalKey === 'entityType' && typeof shrunkenValue === 'number') {
        restoredValue = ENTITY_TYPE_MAP[shrunkenValue] || shrunkenValue;
      } else if (originalKey === 'assessment' && typeof shrunkenValue === 'string') {
        restoredValue = ASSESSMENT_MAP[shrunkenValue] || shrunkenValue;
      } else if (typeof shrunkenValue === 'object' && shrunkenValue !== null) {
        // 递归处理嵌套的对象或数组
        restoredValue = restoreJson(shrunkenValue);
      }

      restoredData[originalKey] = restoredValue;
    }
  }

  return restoredData;
}
