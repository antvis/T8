import { EntityType, ParagraphType } from '../../schema';

export const KEY_DECODER_MAP: Record<string, string> = {
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

export const PHRASE_TYPE_MAP: Record<number, string> = { 1: 'text', 2: 'entity', 3: 'custom' };

export const PARAGRAPH_TYPE_MAP: Record<number, string> = {
  10: ParagraphType.NORMAL,
  11: ParagraphType.BULLETS,
  12: ParagraphType.HEADING1,
  13: ParagraphType.HEADING2,
  14: ParagraphType.HEADING3,
  15: ParagraphType.HEADING4,
  16: ParagraphType.HEADING5,
  17: ParagraphType.HEADING6,
};

export const ENTITY_TYPE_MAP: Record<number, string> = {
  20: EntityType[0],
  21: EntityType[1],
  22: EntityType[2],
  23: EntityType[3],
  24: EntityType[4],
  25: EntityType[5],
  26: EntityType[6],
  27: EntityType[7],
  28: EntityType[8],
  29: EntityType[9],
};

export const ASSESSMENT_MAP: Record<string, string> = { p: 'positive', n: 'negative', e: 'equal', u: 'neutral' };

export const HARDCODED_TYPE_MAP: Record<number, string> = { 30: 'headline', 31: 'section', 32: 'bullet-item' };

export const VALUE_MAP: Record<string | number, string> = {
  ...PARAGRAPH_TYPE_MAP,
  ...ASSESSMENT_MAP,
  ...ENTITY_TYPE_MAP,
  ...PHRASE_TYPE_MAP,
  ...HARDCODED_TYPE_MAP,
};
