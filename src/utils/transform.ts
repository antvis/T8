// 定义键名映射表
const keyMapping: Record<string, string> = {
  hl: 'headline',
  ph: 'phrases',
  ty: 'type',
  se: 'sections',
  pa: 'paragraphs',
  md: 'metadata',
  et: 'entityType',
  or: 'origin',
  as: 'assessment',
  // 未在映射表中的键保持原样
};

// 定义 metadata.entityType 的值映射表
const entityTypeValueMapping: Record<string, string> = {
  mn: 'metric_name',
  mv: 'metric_value',
  omv: 'other_metric_value',
  dev: 'delta_value',
  rv: 'ratio_value',
  cr: 'contribute_ratio',
  td: 'trend_desc',
  dv: 'dim_value',
  tv: 'time_value',
  p: 'proportion',
};

type JsonValue = string | object;
interface JsonObject {
  [key: string]: JsonValue;
}

export function transformJSON(obj: object): JsonValue {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 数组：递归处理每个元素
  if (Array.isArray(obj)) {
    return obj.map((item) => transformJSON(item));
  }

  // 对象：转换键名与内容
  const newObj: JsonObject = {};

  for (const shortKey in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, shortKey)) continue;

    const value = obj[shortKey];
    const fullKey = keyMapping[shortKey] || shortKey;

    // 特殊处理 metadata 对象
    if (shortKey === 'md' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const newMetadata: JsonObject = {};

      for (const mdShortKey in value as JsonObject) {
        if (!Object.prototype.hasOwnProperty.call(value, mdShortKey)) continue;

        const mdValue = (value as JsonObject)[mdShortKey];
        const mdFullKey = keyMapping[mdShortKey] || mdShortKey;

        // 特殊处理 entityType 值
        if (mdShortKey === 'et') {
          newMetadata[mdFullKey] = entityTypeValueMapping[String(mdValue)] || mdValue;
        } else {
          newMetadata[mdFullKey] = mdValue;
        }
      }

      newObj[fullKey] = newMetadata;
    } else {
      // 递归处理其他字段
      newObj[fullKey] = transformJSON(value);
    }
  }

  return newObj;
}
