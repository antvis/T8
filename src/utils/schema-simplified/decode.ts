import { KEY_DECODER_MAP, VALUE_MAP } from './constants';

export function decodeKey(key: string): string {
  return KEY_DECODER_MAP[key] || key;
}

export function decodeValue(originalKey: string, value: unknown): unknown {
  if (originalKey === 'type' || originalKey === 'entityType' || originalKey === 'assessment') {
    const numericKey = Number(value);
    if (!Number.isNaN(numericKey) && VALUE_MAP[numericKey]) {
      return VALUE_MAP[numericKey];
    }
    const stringKey = String(value);
    return VALUE_MAP[stringKey] || value;
  }
  return value;
}

export function maybeToNumber(value: string): number | string {
  if (/^\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}
