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
  tit: 'title',
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

const VALUE_MAP = {
  ...PARAGRAPH_TYPE_MAP,
  ...ASSESSMENT_MAP,
  ...ENTITY_TYPE_MAP,
  ...PHRASE_TYPE_MAP,
  ...HARDCODED_TYPE_MAP,
};

/**
 * 将缩减的值（数字或字符）还原为原始的字符串值。
 */
function decodeValue(originalKey: string, value: unknown): unknown {
  if (originalKey === 'type' || originalKey === 'entityType' || originalKey === 'assessment') {
    const key = String(value);
    return VALUE_MAP[key] || value;
  }
  return value;
}

/**
 * 递归还原函数。
 * @param shrunkenNode 缩减后的 JSON 节点
 * @param isArrayElement 标记当前节点是否作为数组元素被递归调用（用于类型注入）
 */
export function restore(shrunkenNode: unknown): unknown {
  if (shrunkenNode === null || typeof shrunkenNode !== 'object') {
    return shrunkenNode;
  }

  // 1. 数组递归：如果当前节点是数组，直接递归还原每个元素
  if (Array.isArray(shrunkenNode)) {
    return shrunkenNode.map((item) => restore(item));
  }

  const restored: { [key: string]: unknown } = {};
  let arrayContent: unknown[] | null = null;
  let arrayTargetKey: string | null = null;
  let defaultType: unknown | null = null;

  // 2. 核心 Array Optimization / 融合结构处理
  if ('dt' in shrunkenNode && 'i' in shrunkenNode) {
    // 2.1 提取 defaultType
    defaultType = decodeValue('type', (shrunkenNode as Record<string, unknown>).dt);

    // 2.2 还原数组内容并补充默认 type
    arrayContent = (shrunkenNode as { i: unknown[] }).i.map((item: unknown) => {
      const restoredItem = restore(item); // 递归还原子元素

      // 补充默认类型 (针对 Phrase 等数组元素)
      if (
        restoredItem &&
        typeof restoredItem === 'object' &&
        !Array.isArray(restoredItem) &&
        !('type' in restoredItem)
      ) {
        (restoredItem as Record<string, unknown>).type = defaultType;
      }
      return restoredItem;
    });

    // 2.3 纯数组/融合结构还原逻辑 (FIX)
    const keys = Object.keys(shrunkenNode);
    // 检查是否为纯 Array Optimization 结构 (只包含 dt, i 和 CommonProps)
    const nonArrayKeys = keys.filter((k) => k !== 'dt' && k !== 'i' && k !== 'sy' && k !== 'cl' && k !== 'k');
    const isPureArrayOpt = nonArrayKeys.length === 0;

    const structuralTypes = [
      'section',
      'normal',
      'bullets',
      'bullet-item',
      'headline',
      'heading1',
      'heading2',
      'heading3',
      'heading4',
      'heading5',
      'heading6',
    ];
    const phraseTypes = ['text', 'entity', 'custom'];

    if (isPureArrayOpt) {
      if (defaultType && structuralTypes.includes(defaultType as string)) {
        // Case A: 列表容器 (s, pa, b)。直接返回数组。
        return arrayContent;
      }

      // Case B: 压缩的 Paragraph/BulletItem 元素 ( test_json3.json 的段落元素 )
      // dt 是短语类型 ('text')，且是纯 dt/i 结构，强制视为 Paragraph/BulletItem 对象。
      if (defaultType && phraseTypes.includes(defaultType as string)) {
        // **FIX for test_json3.json**
        return {
          type: 'normal', // 无法获取父级类型，只能假设为 'normal'，以符合 TextParagraphSpec
          phrases: arrayContent,
        };
      }
    }
  }

  // 3. 对象键名还原和递归处理 (处理所有键)
  for (const shrunkenKey in shrunkenNode) {
    if (
      !Object.prototype.hasOwnProperty.call(shrunkenNode, shrunkenKey) ||
      shrunkenKey === 'dt' ||
      shrunkenKey === 'i'
    ) {
      continue; // 跳过 dt/i 标记键
    }

    const originalKey = KEY_DECODER_MAP[shrunkenKey] || shrunkenKey;
    const shrunkenValue = shrunkenNode[shrunkenKey];

    // 递归处理子节点
    let restoredValue = restore(shrunkenValue);

    // FIX 1: 单元素数组解包（针对 tit/title 字段）
    if (originalKey === 'title' && Array.isArray(restoredValue) && restoredValue.length === 1) {
      restoredValue = restoredValue[0];
    }

    //短语数组解包 **
    // 如果当前还原的键是 'phrases' ('p')，且它的值是一个强制创建的 Paragraph 对象 (来自 Case B)，
    // 则我们需要解包，只保留内部的 phrases 数组。
    if (
      originalKey === 'phrases' &&
      typeof restoredValue === 'object' &&
      !Array.isArray(restoredValue) &&
      restoredValue !== null &&
      'phrases' in restoredValue
    ) {
      // 仅保留 Phrase 数组内容
      restoredValue = restoredValue.phrases;
    }

    // 值还原（t: 30 -> type: 'headline'）
    restored[originalKey] = decodeValue(originalKey, restoredValue);

    // 3.1 预设 arrayTargetKey：确定融合结构应该将数组内容赋值给哪个字段
    if (originalKey === 'type') {
      const type = restored[originalKey];
      if (
        type === 'headline' ||
        type === 'normal' ||
        type === 'bullet-item' ||
        (type as string)?.startsWith('heading')
      ) {
        arrayTargetKey = 'phrases';
      } else if (type === 'bullets') {
        arrayTargetKey = 'bullets';
      }
    }
  }

  // 4. 融合结构合并 (将 arrayContent 赋给正确的字段)
  if (arrayContent !== null && arrayTargetKey) {
    restored[arrayTargetKey] = arrayContent;
  }

  return restored;
}
