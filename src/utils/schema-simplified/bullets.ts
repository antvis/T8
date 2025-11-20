import { BulletsParagraphSpec, BulletItemSpec, ParagraphType } from '../../schema/paragraph';
import { restorePhrasesFromContainer } from './phrases';
import { decodeValue } from './decode';
import { PhraseContainer, RestoreContext, ShrunkenRecord } from './types';
import { hasContainer, resolvePhraseContainer } from './helpers';

export function restoreBulletsParagraph(node: ShrunkenRecord, ctx: RestoreContext): BulletsParagraphSpec {
  const items = Array.isArray(node.i) ? (node.i as unknown[]) : [];
  const bullets = items
    .map((item, index) => restoreBulletItem(item, `${ctx.path}.bullets[${index}]`, ctx.strict))
    .filter(Boolean) as BulletItemSpec[];
  return { type: ParagraphType.BULLETS, isOrder: !!node.io, bullets };
}

export function restoreBulletItem(raw: unknown, path: string, strict: boolean): BulletItemSpec | null {
  const container = resolvePhraseContainer(raw);
  if (!container) return null;

  const phrases = restorePhrasesFromContainer(
    container as PhraseContainer,
    String(decodeValue('type', container.dt) || 'text'),
    { parentKey: 'p', path, strict },
  );
  if (phrases.length === 0) return null;

  const bulletItem: BulletItemSpec = { type: 'bullet-item', phrases };
  const subBullet = resolveSubBullets(raw, path, strict);
  if (subBullet) bulletItem.subBullet = subBullet;
  return bulletItem;
}

export function buildBulletItem(
  phrases: BulletItemSpec['phrases'],
  node: ShrunkenRecord,
  ctx: RestoreContext,
): BulletItemSpec | null {
  if (!phrases.length) return null;
  const bulletItem: BulletItemSpec = { type: 'bullet-item', phrases };
  const subBullet = resolveSubBullets(node, ctx.path, ctx.strict);
  if (subBullet) bulletItem.subBullet = subBullet;
  return bulletItem;
}

export function resolveSubBullets(raw: unknown, path: string, strict: boolean): BulletsParagraphSpec | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const record = raw as ShrunkenRecord;
  const sub = record.bs;
  if (!sub || typeof sub !== 'object') return undefined;

  if (hasContainer(sub)) {
    return restoreBulletsParagraph(sub as ShrunkenRecord, {
      parentKey: 'b',
      path: `${path}.subBullet`,
      strict,
    });
  }

  if ('b' in (sub as ShrunkenRecord) && hasContainer((sub as ShrunkenRecord).b)) {
    const inner = (sub as ShrunkenRecord).b as ShrunkenRecord;
    return restoreBulletsParagraph(inner, {
      parentKey: 'b',
      path: `${path}.subBullet`,
      strict,
    });
  }

  return undefined;
}
