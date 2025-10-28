// -------------------- 解码映射常量 --------------------
import { NarrativeTextSpec, SectionSpec } from '../src/schema/structure';
import { ParagraphSpec, BulletsParagraphSpec, BulletItemSpec, ParagraphType } from '../src/schema/paragraph';
import { PhraseSpec, PhraseType, TextPhraseSpec, EntityPhraseSpec, CustomPhraseSpec } from '../src/schema/phrase';
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
  s: 'sections',
  p: 'phrases',
  pa: 'paragraphs',
  b: 'bullets',
  io: 'isOrder',
  bs: 'subBullet',
  ct: 'customType',
  isB: 'bold',
  isI: 'italic',
  isU: 'underline',
  url: 'url',
  dt: 'defaultType',
  i: 'items',
  sy: 'styles',
  tit: 'title',
};

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

function decodeValue(originalKey: string, value: unknown): unknown {
  if (originalKey === 'type' || originalKey === 'entityType' || originalKey === 'assessment') {
    // 尝试数字键查找（用于 ENTITY_TYPE_MAP、PHRASE_TYPE_MAP 等）
    const numKey = Number(value);
    if (!isNaN(numKey) && VALUE_MAP[numKey]) {
      return VALUE_MAP[numKey];
    }
    // 回退到字符串键查找（用于 ASSESSMENT_MAP）
    const strKey = String(value);
    return VALUE_MAP[strKey] || value;
  }
  return value;
}

// -------------------- 结构还原核心 --------------------
// 为了严格贴合 schema, 我们需要在还原过程中识别上下文 (headline/sections/paragraphs/phrases/bullets)
// 并过滤掉无效的占位对象 (例如仅保留 {} 的空短语)。

interface RestoreContext {
  parentKey?: string;
  path: string;
  strict: boolean;
}

export interface RestoreOptions {
  strict?: boolean;
}

export function restore(shrunkenNode: unknown, options: RestoreOptions = {}): NarrativeTextSpec | unknown {
  const restored = internalRestore(shrunkenNode, { parentKey: undefined, path: '$', strict: !!options.strict });
  return validateNarrativeSpec(restored as NarrativeTextSpec);
}

function internalRestore(shrunkenNode: unknown, ctx: RestoreContext): unknown {
  if (shrunkenNode === null || typeof shrunkenNode !== 'object') return shrunkenNode;

  // 数组：直接递归
  if (Array.isArray(shrunkenNode)) {
    // 特殊处理：如果 parentKey 是 'pa'，数组中的每个元素应该作为独立段落处理
    if (ctx.parentKey === 'pa') {
      return shrunkenNode.map((n, i) =>
        internalRestore(n, { parentKey: undefined, path: `${ctx.path}[${i}]`, strict: ctx.strict }),
      );
    }
    return shrunkenNode.map((n, i) => internalRestore(n, { ...ctx, path: `${ctx.path}[${i}]` }));
  }

  const node = shrunkenNode as Record<string, unknown>;

  // --- dt/i 优化结构处理 ---
  const hasArrayOpt = 'dt' in node && 'i' in node;
  const decodedDefault = hasArrayOpt ? decodeValue('type', node.dt) : undefined;
  const explicitType = 't' in node ? decodeValue('type', node.t) : undefined;

  // 1. headline 专用 (h 根键) 或 t:headline
  if (ctx.parentKey === 'h' || explicitType === 'headline') {
    let phrases: PhraseSpec[] = [];
    if (Array.isArray(node.i)) {
      phrases = restorePhrasesArray(node.i, String(decodedDefault || 'text'), ctx);
    } else if (
      node.p &&
      typeof node.p === 'object' &&
      'dt' in (node.p as Record<string, unknown>) &&
      'i' in (node.p as Record<string, unknown>)
    ) {
      const pObj = node.p as Record<string, unknown>;
      const innerType = decodeValue('type', pObj.dt);
      phrases = restorePhrasesArray(
        Array.isArray(pObj.i) ? (pObj.i as unknown[]) : [],
        String(innerType || 'text'),
        ctx,
      );
    }
    return { type: 'headline', phrases };
  }

  // 2. sections 容器 (s) -> 返回 SectionSpec[] (schema 不要求 section 有 type)
  if (ctx.parentKey === 's') {
    if (Array.isArray(node.i)) {
      return node.i.map((sec: unknown, idx: number) =>
        expandPlainSection(sec, `${ctx.path}.sections[${idx}]`, ctx.strict),
      );
    }
    return expandPlainSection(node, `${ctx.path}.section`, ctx.strict);
  }

  // 3. 单段落压缩: 同时存在 i/dt 且 explicitType 为段落类型
  if (hasArrayOpt && explicitType && isParagraphType(String(explicitType))) {
    if (explicitType === 'bullets') {
      // bullets 段落会在后续由其自身结构 (可能是 b 容器) 处理，这里只占位
      // 若当前对象直接携带 bullet-item 列表 (dt=32), 则构造 BulletsParagraphSpec
      if (decodedDefault === 'bullet-item') {
        const items = Array.isArray(node.i) ? node.i : [];
        const bullets = items
          .map((bi: unknown, biIdx: number) => restoreBulletItem(bi, `${ctx.path}.bullets[${biIdx}]`, ctx.strict))
          .filter(Boolean) as BulletItemSpec[];
        return { type: ParagraphType.BULLETS, isOrder: !!node.io, bullets };
      }
    }
    // 普通/heading 段落
    const phrases = restorePhrasesArray(Array.isArray(node.i) ? node.i : [], String(decodedDefault || 'text'), ctx);
    return { type: String(explicitType), phrases } as ParagraphSpec;
  }

  // 4. 段落列表容器 (pa) : { dt:10, i:[ {dt:1,i:[..]} ...] }
  if (ctx.parentKey === 'pa' && hasArrayOpt && !explicitType) {
    const paragraphDefaultType = String(decodedDefault || 'normal');
    const items = Array.isArray(node.i) ? node.i : [];
    return items.map((para: unknown) => {
      // 可能是压缩段落: { dt:1, i:[...]} 没有 t
      if (
        para &&
        typeof para === 'object' &&
        'dt' in (para as Record<string, unknown>) &&
        'i' in (para as Record<string, unknown>) &&
        !('t' in (para as Record<string, unknown>))
      ) {
        const pObj = para as Record<string, unknown>;
        const phrases = restorePhrasesArray(
          Array.isArray(pObj.i) ? (pObj.i as unknown[]) : [],
          String(decodeValue('type', pObj.dt) || 'text'),
          ctx,
        );
        if (phrases.length === 0) return null;
        return { type: paragraphDefaultType, phrases } as ParagraphSpec;
      }
      // 显式 t + dt + i: { t:12, dt:1, i:[...] }
      if (
        para &&
        typeof para === 'object' &&
        't' in (para as Record<string, unknown>) &&
        'dt' in (para as Record<string, unknown>) &&
        'i' in (para as Record<string, unknown>) &&
        isParagraphType(String(decodeValue('type', (para as Record<string, unknown>).t)))
      ) {
        const pObj = para as Record<string, unknown>;
        const mappedType = String(decodeValue('type', pObj.t));
        const phrases = restorePhrasesArray(
          Array.isArray(pObj.i) ? (pObj.i as unknown[]) : [],
          String(decodeValue('type', pObj.dt) || 'text'),
          ctx,
        );
        if (mappedType !== 'bullets') {
          if (phrases.length === 0) return null;
          return { type: mappedType, phrases } as ParagraphSpec;
        }
        // bullets handled separately, fallthrough
      }
      // 嵌套 p 容器: { p:{dt:1,i:[...] } }
      if (para && typeof para === 'object' && 'p' in (para as Record<string, unknown>)) {
        const pWrap = (para as Record<string, unknown>).p;
        if (
          pWrap &&
          typeof pWrap === 'object' &&
          'dt' in (pWrap as Record<string, unknown>) &&
          'i' in (pWrap as Record<string, unknown>)
        ) {
          const phrases = restorePhrasesArray(
            Array.isArray((pWrap as Record<string, unknown>).i)
              ? ((pWrap as Record<string, unknown>).i as unknown[])
              : [],
            String(decodeValue('type', (pWrap as Record<string, unknown>).dt) || 'text'),
            ctx,
          );
          const mappedType =
            para && typeof para === 'object' && 't' in (para as Record<string, unknown>)
              ? decodeValue('type', (para as Record<string, unknown>).t)
              : paragraphDefaultType;
          if (String(mappedType) !== 'bullets') {
            if (phrases.length === 0) return null;
            return { type: String(mappedType), phrases } as ParagraphSpec;
          }
        }
      }
      // bullets 容器: { t:11, b:{ dt:32, i:[ {p:{...}}, ...], io:false, t:11 } }
      if (para && typeof para === 'object' && 'b' in (para as Record<string, unknown>)) {
        const b = (para as Record<string, unknown>).b as Record<string, unknown>;
        if (b && 'dt' in b && 'i' in b) {
          const itemsB = Array.isArray(b.i) ? (b.i as unknown[]) : [];
          const bullets = itemsB
            .map((bi: unknown, biIdx: number) => restoreBulletItem(bi, `${ctx.path}.bullets[${biIdx}]`, ctx.strict))
            .filter(Boolean) as BulletItemSpec[];
          const isOrder = !!b.io;
          if (bullets.length === 0) return null;
          return { type: ParagraphType.BULLETS, isOrder, bullets } as BulletsParagraphSpec;
        }
      }
      return null;
    });
  }

  // 5. 短语数组 (p) 或 bullet-item 内的 p
  if (ctx.parentKey === 'p' && hasArrayOpt) {
    return restorePhrasesArray(Array.isArray(node.i) ? node.i : [], String(decodedDefault || 'text'), ctx);
  }

  // 6. bullets 段落内部结构 (b): { dt:32, i:[ { p:{dt:1,i:[]}}, ...], t:11 }
  if (ctx.parentKey === 'b' || (explicitType === 'bullets' && decodedDefault === 'bullet-item')) {
    const itemsB = Array.isArray(node.i) ? (node.i as unknown[]) : [];
    const bullets = itemsB
      .map((bi: unknown, biIdx: number) => restoreBulletItem(bi, `${ctx.path}.bullets[${biIdx}]`, ctx.strict))
      .filter(Boolean) as BulletItemSpec[];
    return { type: ParagraphType.BULLETS, isOrder: !!node.io, bullets } as BulletsParagraphSpec;
  }

  // 7. bullet-item 压缩 (dt:1 phrases)
  if (ctx.parentKey === 'bullet-item' && hasArrayOpt) {
    const phrases = restorePhrasesArray(Array.isArray(node.i) ? node.i : [], String(decodedDefault || 'text'), ctx);
    return { type: 'bullet-item', phrases } as BulletItemSpec;
  }

  // 8. 常规对象遍历 (包括 section 对象、含 pa/b 等)
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(node)) {
    if (k === 'dt' || k === 'i') continue; // 延后处理
    const originalKey = KEY_DECODER_MAP[k] || k;
    const value = node[k];
    // 子上下文判定
    let childParentKey: string | undefined;
    if (k === 'h') childParentKey = 'h';
    else if (k === 's') childParentKey = 's';
    else if (k === 'pa') childParentKey = 'pa';
    else if (k === 'p') childParentKey = 'p';
    else if (k === 'b') childParentKey = 'b';
    else if (k === 'phrases') childParentKey = 'p';

    let restoredValue = internalRestore(value, {
      parentKey: childParentKey,
      path: `${ctx.path}.${originalKey}`,
      strict: ctx.strict,
    });

    // 特殊处理：如果对象只有一个 'b' 键，直接返回 bullets 段落
    if (k === 'b' && Object.keys(node).length === 1 && restoredValue && typeof restoredValue === 'object') {
      return restoredValue;
    }

    // 单元素 title 解包
    if (originalKey === 'title' && Array.isArray(restoredValue) && restoredValue.length === 1) {
      restoredValue = restoredValue[0];
    }

    // origin 数字强制转换
    if (originalKey === 'origin' && typeof restoredValue === 'string' && /^\d+(\.\d+)?$/.test(restoredValue)) {
      restoredValue = Number(restoredValue);
    }

    out[originalKey] = decodeValue(originalKey, restoredValue);
  }

  // headline/shrunken section 根级特殊键展开
  if (ctx.parentKey === 'section') {
    // section 对象允许包含 paragraphs (pa) 还原结果为数组
    return out;
  }

  return out;
}

// 还原短语数组：注入默认类型，过滤无效元素
function restorePhrasesArray(items: unknown[], defaultPhraseType: string, ctx: RestoreContext): PhraseSpec[] {
  const baseType = isPhraseType(defaultPhraseType) ? defaultPhraseType : 'text';
  return items
    .map((raw) => {
      if (raw === null || typeof raw !== 'object') return null;
      const obj = raw as Record<string, unknown>;
      const explicitType = 't' in obj ? decodeValue('type', obj.t) : undefined;
      const typeStr = explicitType && isPhraseType(String(explicitType)) ? String(explicitType) : baseType;
      const value = obj.v;
      const meta = obj.m;
      const bold = obj.isB ? true : undefined;
      const italic = obj.isI ? true : undefined;
      const underline = obj.isU ? true : undefined;
      const url = typeof obj.url === 'string' ? obj.url : undefined;
      if (typeStr === 'text') {
        if (typeof value !== 'string' || value === '') return null;
        const phrase: TextPhraseSpec = { type: PhraseType.TEXT, value };
        if (bold) phrase.bold = true;
        if (italic) phrase.italic = true;
        if (underline) phrase.underline = true;
        if (url) phrase.url = url;
        return phrase;
      }
      if (typeStr === 'entity') {
        if (typeof value !== 'string' || value === '') return null;
        if (!meta || typeof meta !== 'object') return null;
        const mObj = meta as Record<string, unknown>;
        const restoredMeta: Record<string, unknown> = {};
        for (const mk of Object.keys(mObj)) {
          const ok = KEY_DECODER_MAP[mk] || mk;
          let mv = mObj[mk];
          if (ok === 'entityType') mv = decodeValue('entityType', mv);
          if (ok === 'assessment') mv = decodeValue('assessment', mv);
          if (ok === 'origin' && typeof mv === 'string' && /^\d+(\.\d+)?$/.test(mv)) mv = Number(mv);
          restoredMeta[ok] = mv;
        }
        if (!('entityType' in restoredMeta)) {
          if (ctx.strict) throw new Error(`Missing entityType at ${ctx.path}`);
          return null;
        }
        const phrase: EntityPhraseSpec = {
          type: PhraseType.ENTITY,
          value,
          metadata: restoredMeta as EntityPhraseSpec['metadata'],
        };
        return phrase;
      }
      if (typeStr === 'custom') {
        if (typeof value !== 'string' || value === '') return null;
        if (meta && typeof meta === 'object') {
          const mObj = meta as Record<string, unknown>;
          const restoredMeta: Record<string, unknown> = {};
          for (const mk of Object.keys(mObj)) {
            const ok = KEY_DECODER_MAP[mk] || mk;
            let mv = mObj[mk];
            if (ok === 'origin' && typeof mv === 'string' && /^\d+(\.\d+)?$/.test(mv)) mv = Number(mv);
            restoredMeta[ok] = mv;
          }
          // 若 metadata 中没有 customType, 但 custom phrase 允许缺省 -> 仅在存在时保留
          const phrase: CustomPhraseSpec = {
            type: PhraseType.CUSTOM,
            value,
            metadata: restoredMeta as CustomPhraseSpec['metadata'],
          };
          return phrase;
        }
        return { type: PhraseType.CUSTOM, value } as CustomPhraseSpec;
      }
      return null;
    })
    .filter((p): p is PhraseSpec => !!p);
}

function restoreBulletItem(raw: unknown, path: string, strict: boolean): BulletItemSpec | null {
  if (!raw || typeof raw !== 'object') return null;
  // 压缩形式: { p:{ dt:1, i:[ {...phrase...} ] } } 或 { dt:1,i:[...] }
  if ('p' in raw) {
    const phrasesContainer = raw.p;
    if (
      phrasesContainer &&
      typeof phrasesContainer === 'object' &&
      'dt' in phrasesContainer &&
      'i' in phrasesContainer
    ) {
      const items = Array.isArray((phrasesContainer as Record<string, unknown>).i)
        ? ((phrasesContainer as Record<string, unknown>).i as unknown[])
        : [];
      const phrases = restorePhrasesArray(
        items,
        String(decodeValue('type', (phrasesContainer as Record<string, unknown>).dt) || 'text'),
        { parentKey: 'p', path, strict },
      );
      const bulletItem: BulletItemSpec = { type: 'bullet-item', phrases };
      // 处理子级 bullets: 压缩键 bs -> subBullet paragraph (t:11) 或直接 dt:32,i:[...] 列表
      if ('bs' in raw && raw.bs && typeof raw.bs === 'object') {
        const sub = raw.bs;
        // 支持两种： { dt:32,i:[{p:{...}},...] , io:true } 或 { b:{ dt:32,i:[...] } }
        if ('dt' in sub && 'i' in sub) {
          const subItems = Array.isArray(sub.i) ? (sub.i as unknown[]) : [];
          const subBullets = subItems
            .map((bi: unknown, biIdx: number) => restoreBulletItem(bi, `${path}.subBullet.bullets[${biIdx}]`, strict))
            .filter(Boolean);
          if (subBullets.length)
            bulletItem.subBullet = {
              type: ParagraphType.BULLETS,
              isOrder: !!(sub as Record<string, unknown>).io,
              bullets: subBullets,
            };
        } else if ('b' in sub && sub.b && typeof sub.b === 'object' && 'dt' in sub.b && 'i' in sub.b) {
          const bInner = sub.b as Record<string, unknown>;
          const subItems = Array.isArray(bInner.i) ? (bInner.i as unknown[]) : [];
          const subBullets = subItems
            .map((bi: unknown, biIdx: number) => restoreBulletItem(bi, `${path}.subBullet.bullets[${biIdx}]`, strict))
            .filter(Boolean);
          if (subBullets.length)
            bulletItem.subBullet = { type: ParagraphType.BULLETS, isOrder: !!bInner.io, bullets: subBullets };
        }
      }
      return bulletItem;
    }
  }
  if ('dt' in raw && 'i' in raw) {
    const items = Array.isArray((raw as Record<string, unknown>).i)
      ? ((raw as Record<string, unknown>).i as unknown[])
      : [];
    const phrases = restorePhrasesArray(
      items,
      String(decodeValue('type', (raw as Record<string, unknown>).dt) || 'text'),
      { parentKey: 'p', path, strict },
    );
    const bulletItem: BulletItemSpec = { type: 'bullet-item', phrases };
    if ('bs' in raw && raw.bs && typeof raw.bs === 'object') {
      const sub = raw.bs;
      if ('dt' in sub && 'i' in sub) {
        const subItems = Array.isArray(sub.i) ? (sub.i as unknown[]) : [];
        const subBullets = subItems
          .map((bi: unknown, biIdx: number) => restoreBulletItem(bi, `${path}.subBullet.bullets[${biIdx}]`, strict))
          .filter(Boolean);
        if (subBullets.length)
          bulletItem.subBullet = {
            type: ParagraphType.BULLETS,
            isOrder: !!(sub as Record<string, unknown>).io,
            bullets: subBullets,
          };
      } else if ('b' in sub && sub.b && typeof sub.b === 'object' && 'dt' in sub.b && 'i' in sub.b) {
        const bInner = sub.b as Record<string, unknown>;
        const subItems = Array.isArray(bInner.i) ? (bInner.i as unknown[]) : [];
        const subBullets = subItems
          .map((bi: unknown, biIdx: number) => restoreBulletItem(bi, `${path}.subBullet.bullets[${biIdx}]`, strict))
          .filter(Boolean);
        if (subBullets.length)
          bulletItem.subBullet = { type: ParagraphType.BULLETS, isOrder: !!bInner.io, bullets: subBullets };
      }
    }
    return bulletItem;
  }
  return null;
}

function isPhraseType(t: string): boolean {
  return ['text', 'entity', 'custom'].includes(t);
}

function isParagraphType(t: string): boolean {
  return ['normal', 'bullets'].includes(t) || /^heading[1-6]$/.test(t);
}

function expandPlainSection(sec: unknown, path: string, strict: boolean): SectionSpec {
  if (!sec || typeof sec !== 'object') return {} as SectionSpec;
  const sectionObj: SectionSpec & { [key: string]: unknown } = {} as SectionSpec & { [key: string]: unknown };
  for (const sk of Object.keys(sec)) {
    const ok = KEY_DECODER_MAP[sk] || sk;
    const sv = sec[sk];
    if (sk === 'pa') {
      const paragraphsRestored = internalRestore(sv, { parentKey: 'pa', path: `${path}.pa`, strict });
      if (Array.isArray(paragraphsRestored)) sectionObj.paragraphs = paragraphsRestored as ParagraphSpec[];
      else if (paragraphsRestored && typeof paragraphsRestored === 'object')
        sectionObj.paragraphs = [paragraphsRestored as ParagraphSpec];
      else sectionObj.paragraphs = [];
    } else if (sk === 'tit') {
      const titleVal = internalRestore(sv, { parentKey: 'p', path: `${path}.title`, strict });
      sectionObj.title = Array.isArray(titleVal)
        ? { type: ParagraphType.NORMAL, phrases: titleVal as PhraseSpec[] }
        : titleVal;
    } else if (sk === 'dt' || sk === 'i') {
      continue;
    } else {
      sectionObj[ok] = internalRestore(sv, { parentKey: undefined, path: `${path}.${ok}`, strict });
    }
  }
  return sectionObj;
}

// -------------------- 基础校验 --------------------
function validateNarrativeSpec(root: NarrativeTextSpec): NarrativeTextSpec {
  if (!root || typeof root !== 'object') return root;

  // 校验 headline
  if (root.headline) {
    const h = root.headline;
    if (h.type !== 'headline' || !Array.isArray(h.phrases)) delete root.headline;
    else h.phrases = h.phrases.filter(isValidPhrase);
  }

  // 若压缩结构未已展开，兼容 h 键
  const rootObj = root as NarrativeTextSpec & { [key: string]: unknown };
  if (!rootObj.headline && 'h' in rootObj) {
    rootObj.headline = rootObj.h as unknown as NarrativeTextSpec['headline'];
    delete rootObj.h;
  }

  // sections -> paragraphs
  if (rootObj.sections) {
    if (Array.isArray(rootObj.sections)) {
      rootObj.sections = rootObj.sections
        .map((sec: SectionSpec) => validateSection(sec))
        .filter(Boolean) as SectionSpec[];
    } else delete rootObj.sections;
  } else if ('s' in rootObj && Array.isArray(rootObj.s as unknown[])) {
    const sArr = rootObj.s as unknown[];
    rootObj.sections = sArr.map((sec: unknown) => validateSection(sec as SectionSpec)).filter(Boolean) as SectionSpec[];
    delete rootObj.s;
  }
  return root;
}

function validateSection(sec: SectionSpec): SectionSpec | null {
  if (!sec || typeof sec !== 'object') return null;
  const pArr = (sec as SectionSpec & { paragraphs?: unknown }).paragraphs;
  if (Array.isArray(pArr)) {
    (sec as SectionSpec & { paragraphs?: ParagraphSpec[] }).paragraphs = pArr
      .map((p) => validateParagraph(p as ParagraphSpec))
      .filter(Boolean) as ParagraphSpec[];
  } else if (pArr && typeof pArr === 'object' && 'type' in (pArr as Record<string, unknown>)) {
    const validated = validateParagraph(pArr as ParagraphSpec);
    (sec as SectionSpec & { paragraphs?: ParagraphSpec[] }).paragraphs = validated ? [validated] : [];
  } else {
    (sec as SectionSpec & { paragraphs?: ParagraphSpec[] }).paragraphs = [];
  }
  return sec;
}

function isHeadingOrText(p: ParagraphSpec): p is ParagraphSpec & { phrases: PhraseSpec[] } {
  return p.type === ParagraphType.NORMAL || /^heading[1-6]$/.test(String(p.type));
}
function isBulletsParagraph(p: ParagraphSpec): p is BulletsParagraphSpec {
  return p.type === ParagraphType.BULLETS;
}
function validateParagraph(p: ParagraphSpec): ParagraphSpec | null {
  if (!p || typeof p !== 'object') return null;
  const t = p.type;
  if (!t) return null;
  if (isHeadingOrText(p)) {
    if (!Array.isArray((p as ParagraphSpec & { phrases: PhraseSpec[] }).phrases)) return null;
    (p as ParagraphSpec & { phrases: PhraseSpec[] }).phrases = (
      p as ParagraphSpec & { phrases: PhraseSpec[] }
    ).phrases.filter(isValidPhrase);
    if ((p as ParagraphSpec & { phrases: PhraseSpec[] }).phrases.length === 0) return null;
    return p;
  }
  if (isBulletsParagraph(p)) {
    if (!Array.isArray(p.bullets) || typeof p.isOrder !== 'boolean') return null;
    p.bullets = p.bullets.map(validateBulletItem).filter(Boolean) as BulletItemSpec[];
    if (p.bullets.length === 0) return null;
    return p;
  }
  // custom block passthrough
  if ((p as ParagraphSpec & { customType?: string }).customType) return p;
  return null;
}

function validateBulletItem(bi: BulletItemSpec): BulletItemSpec | null {
  if (!bi || typeof bi !== 'object') return null;
  if (bi.type !== 'bullet-item') return null;
  if (!Array.isArray(bi.phrases)) return null;
  bi.phrases = bi.phrases.filter(isValidPhrase);
  if (bi.phrases.length === 0) return null; // prune empty bullet-item
  if (bi.subBullet) {
    const validated = validateParagraph(bi.subBullet);
    if (validated && validated.type === ParagraphType.BULLETS) bi.subBullet = validated as BulletsParagraphSpec;
    else delete bi.subBullet;
  }
  if (bi.subBullet && (!bi.subBullet.bullets || bi.subBullet.bullets.length === 0)) delete bi.subBullet;
  return bi;
}

function isValidPhrase(ph: PhraseSpec): boolean {
  if (!ph || typeof ph !== 'object') return false;
  if (ph.type === PhraseType.TEXT) return typeof (ph as TextPhraseSpec).value === 'string';
  if (ph.type === PhraseType.ENTITY) {
    if (typeof ph.value !== 'string') return false;
    const md = (ph as EntityPhraseSpec).metadata;
    if (!md || typeof md !== 'object') return false;
    if (!('entityType' in md)) return false;
    return true;
  }
  if (ph.type === PhraseType.CUSTOM) return true;
  return false;
}

// CommonJS + ESM 兼容导出（在浏览器环境没有 module 时不会报错）
declare const module: { exports?: Record<string, unknown> } | undefined;
if (typeof module !== 'undefined' && module && module.exports) {
  module.exports.restore = restore;
}
