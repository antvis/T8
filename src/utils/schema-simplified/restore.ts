import { NarrativeTextSpec, SectionSpec } from '../../schema/structure';
import { ParagraphSpec, BulletsParagraphSpec, ParagraphType } from '../../schema/paragraph';
import { PhraseSpec } from '../../schema/phrase';
import { RestoreOptions, RestoreContext, ShrunkenRecord, PhraseContainer } from './types';
import { decodeValue, decodeKey, maybeToNumber } from './decode';
import { hasContainer, resolvePhraseContainer, getChildContext } from './helpers';
import { restorePhrasesFromContainer, restorePhrases } from './phrases';
import { restoreBulletsParagraph, buildBulletItem } from './bullets';
import { restoreInlineParagraph, restoreParagraphList, isParagraphType } from './paragraphs';
import { validateNarrativeSpec } from './validation';

export function restore(shrunkenNode: unknown, options: RestoreOptions = {}): NarrativeTextSpec {
  const restored = internalRestore(shrunkenNode, { parentKey: undefined, path: '$', strict: !!options.strict });
  return validateNarrativeSpec(restored);
}

function internalRestore(shrunkenNode: unknown, ctx: RestoreContext): unknown | NarrativeTextSpec {
  if (shrunkenNode === null || typeof shrunkenNode !== 'object') return shrunkenNode;

  if (Array.isArray(shrunkenNode)) {
    if (ctx.parentKey === 'pa') {
      return shrunkenNode.map((item, index) =>
        internalRestore(item, { parentKey: undefined, path: `${ctx.path}[${index}]`, strict: ctx.strict }),
      );
    }
    return shrunkenNode.map((item, index) => internalRestore(item, { ...ctx, path: `${ctx.path}[${index}]` }));
  }

  const node = shrunkenNode as ShrunkenRecord;
  const hasCompressedContainer = hasContainer(node);
  const defaultType = hasCompressedContainer ? decodeValue('type', node.dt) : undefined;
  const explicitType = 't' in node ? decodeValue('type', node.t) : undefined;

  if (ctx.parentKey === 'h' || explicitType === 'headline') {
    return restoreHeadline(node, defaultType, ctx);
  }

  if (ctx.parentKey === 's') {
    return restoreSections(node, ctx);
  }

  if (hasCompressedContainer && explicitType && isParagraphType(String(explicitType))) {
    return restoreInlineParagraph(node, String(explicitType), defaultType, ctx);
  }

  if (ctx.parentKey === 'pa' && hasCompressedContainer && !explicitType) {
    return restoreParagraphList(node, defaultType, ctx);
  }

  if (ctx.parentKey === 'p' && hasCompressedContainer) {
    return restorePhrasesFromContainer(node as PhraseContainer, String(defaultType || 'text'), ctx);
  }

  if (ctx.parentKey === 'b' || (explicitType === 'bullets' && defaultType === 'bullet-item')) {
    return restoreBulletsParagraph(node, ctx);
  }

  if (ctx.parentKey === 'bullet-item' && hasCompressedContainer) {
    const phrases = restorePhrasesFromContainer(node as PhraseContainer, String(defaultType || 'text'), ctx);
    return buildBulletItem(phrases, node, ctx);
  }

  return restoreGenericObject(node, ctx);
}

function restoreHeadline(
  node: ShrunkenRecord,
  defaultType: unknown,
  ctx: RestoreContext,
): NarrativeTextSpec['headline'] {
  const baseType = String(defaultType || 'text');
  const phraseContainer = resolvePhraseContainer(node) ?? resolvePhraseContainer(node.p);
  let phrases: PhraseSpec[] = [];
  if (Array.isArray(node.i)) {
    phrases = restorePhrases(node.i, baseType, ctx);
  } else if (phraseContainer) {
    phrases = restorePhrasesFromContainer(phraseContainer, baseType, ctx);
  }
  return { type: 'headline', phrases };
}

function restoreSections(node: ShrunkenRecord, ctx: RestoreContext): SectionSpec | SectionSpec[] {
  const container = resolvePhraseContainer(node);
  if (container) {
    const items = Array.isArray(container.i) ? (container.i as unknown[]) : [];
    return items.map((section, index) => expandPlainSection(section, `${ctx.path}.sections[${index}]`, ctx.strict));
  }
  return expandPlainSection(node, `${ctx.path}.section`, ctx.strict);
}

function restoreGenericObject(
  node: ShrunkenRecord,
  ctx: RestoreContext,
): Record<string, unknown> | BulletsParagraphSpec {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(node)) {
    if (key === 'dt' || key === 'i') continue;
    const originalKey = decodeKey(key);
    const childContext = getChildContext(key, originalKey, ctx);
    let restoredValue = internalRestore(node[key], childContext);

    if (key === 'b' && Object.keys(node).length === 1 && restoredValue && typeof restoredValue === 'object') {
      return restoredValue as BulletsParagraphSpec;
    }

    if (originalKey === 'title' && Array.isArray(restoredValue) && restoredValue.length === 1) {
      restoredValue = restoredValue[0];
    }

    if (originalKey === 'origin' && typeof restoredValue === 'string') {
      restoredValue = maybeToNumber(restoredValue);
    }

    result[originalKey] = decodeValue(originalKey, restoredValue);
  }

  if (ctx.parentKey === 'section') {
    return result;
  }

  return result;
}

function expandPlainSection(sec: unknown, path: string, strict: boolean): SectionSpec {
  if (!sec || typeof sec !== 'object') return {} as SectionSpec;
  const sectionObj: Record<string, unknown> = {};

  for (const key of Object.keys(sec as ShrunkenRecord)) {
    const originalKey = decodeKey(key);
    const value = (sec as ShrunkenRecord)[key];

    if (key === 'pa') {
      const restored = internalRestore(value, { parentKey: 'pa', path: `${path}.pa`, strict });
      if (Array.isArray(restored)) sectionObj.paragraphs = restored as ParagraphSpec[];
      else if (restored && typeof restored === 'object') sectionObj.paragraphs = [restored as ParagraphSpec];
      else sectionObj.paragraphs = [];
      continue;
    }

    if (key === 'tit') {
      const title = internalRestore(value, { parentKey: 'p', path: `${path}.title`, strict });
      sectionObj.title = Array.isArray(title) ? { type: ParagraphType.NORMAL, phrases: title as PhraseSpec[] } : title;
      continue;
    }

    if (key === 'dt' || key === 'i') continue;

    sectionObj[originalKey] = internalRestore(value, {
      parentKey: undefined,
      path: `${path}.${originalKey}`,
      strict,
    });
  }
  return sectionObj as SectionSpec;
}

declare const module: { exports?: Record<string, unknown> } | undefined;
if (typeof module !== 'undefined' && module && module.exports) {
  module.exports.restore = restore;
}
