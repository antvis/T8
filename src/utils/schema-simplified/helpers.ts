import { RestoreContext, PhraseContainer, ShrunkenRecord } from './types';

export function hasContainer(value: unknown): value is PhraseContainer & ShrunkenRecord {
  return (
    !!value &&
    typeof value === 'object' &&
    'dt' in (value as Record<string, unknown>) &&
    'i' in (value as Record<string, unknown>)
  );
}

export function resolvePhraseContainer(value: unknown): PhraseContainer | null {
  if (!value || typeof value !== 'object') return null;
  if (hasContainer(value)) return value as PhraseContainer;
  if ('p' in (value as ShrunkenRecord) && hasContainer((value as ShrunkenRecord).p)) {
    return (value as ShrunkenRecord).p as PhraseContainer;
  }
  return null;
}

export function getChildContext(key: string, originalKey: string, ctx: RestoreContext): RestoreContext {
  let parentKey: string | undefined;
  if (key === 'h') parentKey = 'h';
  else if (key === 's') parentKey = 's';
  else if (key === 'pa') parentKey = 'pa';
  else if (key === 'p' || originalKey === 'phrases') parentKey = 'p';
  else if (key === 'b') parentKey = 'b';

  return {
    parentKey,
    path: `${ctx.path}.${originalKey}`,
    strict: ctx.strict,
  };
}
