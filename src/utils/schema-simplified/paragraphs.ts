import { ParagraphSpec, BulletsParagraphSpec, ParagraphType } from '../../schema/paragraph';
import { PhraseSpec } from '../../schema/phrase';
import { decodeValue } from './decode';
import { restorePhrasesFromContainer, restorePhrases } from './phrases';
import { RestoreContext, ShrunkenRecord, PhraseContainer } from './types';
import { hasContainer, resolvePhraseContainer } from './helpers';
import { restoreBulletsParagraph } from './bullets';

export function restoreInlineParagraph(
  node: ShrunkenRecord,
  explicitType: string,
  defaultType: unknown,
  ctx: RestoreContext,
): ParagraphSpec | BulletsParagraphSpec | null {
  if (explicitType === ParagraphType.BULLETS) {
    if (defaultType === 'bullet-item') {
      return restoreBulletsParagraph(node, ctx);
    }
    return null;
  }
  const phrases = restorePhrasesFromContainer(
    { dt: node.dt, i: node.i } as PhraseContainer,
    String(defaultType || 'text'),
    ctx,
  );
  return { type: explicitType, phrases } as ParagraphSpec;
}

export function restoreParagraphList(
  node: ShrunkenRecord,
  defaultType: unknown,
  ctx: RestoreContext,
): Array<ParagraphSpec | BulletsParagraphSpec> {
  const items = Array.isArray(node.i) ? (node.i as unknown[]) : [];
  const fallbackType = String(defaultType || ParagraphType.NORMAL);
  return items
    .map((item, index) => restoreParagraphFromItem(item, fallbackType, ctx, index))
    .filter((paragraph): paragraph is ParagraphSpec | BulletsParagraphSpec => paragraph !== null);
}

export function restoreParagraphFromItem(
  item: unknown,
  fallbackType: string,
  ctx: RestoreContext,
  index: number,
): ParagraphSpec | BulletsParagraphSpec | null {
  if (!item || typeof item !== 'object') return null;

  const record = item as ShrunkenRecord;
  const container = resolvePhraseContainer(record) ?? resolvePhraseContainer(record.p);
  const decodedExplicit = 't' in record ? decodeValue('type', record.t) : undefined;

  if (decodedExplicit === ParagraphType.BULLETS) {
    const bulletSource = record.b && typeof record.b === 'object' ? (record.b as ShrunkenRecord) : record;
    if (hasContainer(bulletSource)) {
      return restoreBulletsParagraph(bulletSource, {
        parentKey: 'b',
        path: `${ctx.path}[${index}]`,
        strict: ctx.strict,
      });
    }
  }

  const phrases =
    container && container.i
      ? restorePhrasesFromContainer(container, String(decodeValue('type', container.dt) || 'text'), ctx)
      : Array.isArray(record.i)
        ? restorePhrases(record.i, String(decodeValue('type', record.dt) || fallbackType || 'text'), ctx)
        : [];

  if (decodedExplicit && decodedExplicit !== ParagraphType.BULLETS && isParagraphType(String(decodedExplicit))) {
    if (phrases.length === 0) return null;
    return { type: String(decodedExplicit), phrases } as ParagraphSpec;
  }

  if (record.b) {
    return restoreBulletsParagraph(record.b as ShrunkenRecord, {
      parentKey: 'b',
      path: `${ctx.path}[${index}]`,
      strict: ctx.strict,
    });
  }

  if (phrases.length === 0) return null;
  return { type: fallbackType, phrases } as ParagraphSpec;
}

export function isParagraphType(type: string): boolean {
  return type === ParagraphType.NORMAL || type === ParagraphType.BULLETS || /^heading[1-6]$/.test(type);
}

export function isHeadingOrText(paragraph: ParagraphSpec): paragraph is ParagraphSpec & { phrases: PhraseSpec[] } {
  return paragraph.type === ParagraphType.NORMAL || /^heading[1-6]$/.test(String(paragraph.type));
}

export function isBulletsParagraph(paragraph: ParagraphSpec): paragraph is BulletsParagraphSpec {
  return paragraph.type === ParagraphType.BULLETS;
}
