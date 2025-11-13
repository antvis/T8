import { PhraseSpec, PhraseType, TextPhraseSpec, EntityPhraseSpec, CustomPhraseSpec } from '../../schema/phrase';
import { decodeKey, decodeValue, maybeToNumber } from './decode';
import { PhraseContainer, RestoreContext, ShrunkenRecord } from './types';

export function restorePhrasesFromContainer(
  container: PhraseContainer,
  defaultPhraseType: string,
  ctx: RestoreContext,
): PhraseSpec[] {
  const items = Array.isArray(container.i) ? (container.i as unknown[]) : [];
  return restorePhrases(items, defaultPhraseType, ctx);
}

export function restorePhrases(items: unknown[], defaultPhraseType: string, ctx: RestoreContext): PhraseSpec[] {
  const baseType = isPhraseType(defaultPhraseType) ? defaultPhraseType : 'text';
  return items.map((raw) => restorePhrase(raw, baseType, ctx)).filter((phrase): phrase is PhraseSpec => !!phrase);
}

export function restorePhrase(raw: unknown, baseType: string, ctx: RestoreContext): PhraseSpec | null {
  if (!raw || typeof raw !== 'object') return null;
  const record = raw as ShrunkenRecord;
  const explicitType = 't' in record ? decodeValue('type', record.t) : undefined;
  const inferredType = explicitType && isPhraseType(String(explicitType)) ? String(explicitType) : baseType;
  const value = record.v;

  if (inferredType === 'text') {
    return buildTextPhrase(value, record);
  }
  if (inferredType === 'entity') {
    return buildEntityPhrase(value, record.m, ctx);
  }
  if (inferredType === 'custom') {
    return buildCustomPhrase(value, record.m);
  }
  return null;
}

export function buildTextPhrase(value: unknown, record: ShrunkenRecord): TextPhraseSpec | null {
  if (typeof value !== 'string' || value === '') return null;
  const phrase: TextPhraseSpec = { type: PhraseType.TEXT, value };
  if (record.isB) phrase.bold = true;
  if (record.isI) phrase.italic = true;
  if (record.isU) phrase.underline = true;
  if (typeof record.url === 'string') phrase.url = record.url;
  return phrase;
}

export function buildEntityPhrase(value: unknown, meta: unknown, ctx: RestoreContext): EntityPhraseSpec | null {
  if (typeof value !== 'string' || value === '') return null;
  const decodedMetadata = decodeMetadata(meta, ctx);
  if (!decodedMetadata) return null;
  if (!('entityType' in decodedMetadata)) {
    if (ctx.strict) throw new Error(`Missing entityType at ${ctx.path}`);
    return null;
  }
  return {
    type: PhraseType.ENTITY,
    value,
    metadata: decodedMetadata as EntityPhraseSpec['metadata'],
  };
}

export function buildCustomPhrase(value: unknown, meta: unknown): CustomPhraseSpec | null {
  if (typeof value !== 'string' || value === '') return null;
  const decodedMetadata = decodeMetadata(meta);
  if (decodedMetadata) {
    return {
      type: PhraseType.CUSTOM,
      value,
      metadata: decodedMetadata as CustomPhraseSpec['metadata'],
    };
  }
  return { type: PhraseType.CUSTOM, value };
}

export function decodeMetadata(meta: unknown, ctx?: RestoreContext): Record<string, unknown> | null {
  if (!meta || typeof meta !== 'object') return null;
  const metadata: Record<string, unknown> = {};
  for (const key of Object.keys(meta as ShrunkenRecord)) {
    const originalKey = decodeKey(key);
    let value = (meta as ShrunkenRecord)[key];
    if (originalKey === 'entityType') value = decodeValue('entityType', value);
    if (originalKey === 'assessment') value = decodeValue('assessment', value);
    if (originalKey === 'origin' && typeof value === 'string') value = maybeToNumber(value);
    metadata[originalKey] = value;
  }
  if (ctx && ctx.strict && !metadata.entityType) {
    throw new Error(`Missing entityType at ${ctx.path}`);
  }
  return metadata;
}

export function isPhraseType(type: string): boolean {
  return type === 'text' || type === 'entity' || type === 'custom';
}

export function isValidPhrase(phrase: PhraseSpec): boolean {
  if (!phrase || typeof phrase !== 'object') return false;
  if (phrase.type === PhraseType.TEXT) return typeof (phrase as TextPhraseSpec).value === 'string';
  if (phrase.type === PhraseType.ENTITY) {
    if (typeof phrase.value !== 'string') return false;
    const metadata = (phrase as EntityPhraseSpec).metadata;
    return !!metadata && typeof metadata === 'object' && 'entityType' in metadata;
  }
  if (phrase.type === PhraseType.CUSTOM) return true;
  return false;
}
