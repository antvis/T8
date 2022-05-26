import {
  SectionSpec,
  ParagraphSpec,
  CustomMetaData,
  StandardSectionSpec,
  TextParagraphSpec,
  BulletsParagraphSpec,
  HeadingParagraphSpec,
  PhraseSpec,
  CustomPhraseSpec,
  EntityPhraseSpec,
  EntityType,
  TextPhraseSpec,
} from '../schema';

export function isCustomSection(spec: SectionSpec): spec is CustomMetaData {
  return 'customType' in spec;
}

export function isCustomParagraph(spec: ParagraphSpec): spec is CustomMetaData {
  return 'customType' in spec;
}

export function isStandardSection(spec: SectionSpec): spec is StandardSectionSpec {
  return 'paragraphs' in spec && Array.isArray(spec.paragraphs);
}

export function isTextParagraph(spec: ParagraphSpec): spec is TextParagraphSpec {
  return spec?.type === 'normal' && Array.isArray(spec?.phrases);
}

export function isBulletParagraph(spec: ParagraphSpec): spec is BulletsParagraphSpec {
  return spec?.type === 'bullets' && Array.isArray(spec?.bullets);
}

export function isHeadingParagraph(spec: ParagraphSpec): spec is HeadingParagraphSpec {
  if ('type' in spec && isString(spec.type)) {
    const weight = getHeadingWeight(spec?.type);
    return spec.type.startsWith('heading') && !Number.isNaN(weight);
  }
  return false;
}

export function isCustomPhrase(spec: PhraseSpec): spec is CustomPhraseSpec {
  return spec?.type === 'custom' && !!spec?.metadata?.customType;
}

export function isEntityPhrase(spec: PhraseSpec): spec is EntityPhraseSpec {
  return spec?.type === 'entity' && EntityType.includes(spec?.metadata?.entityType);
}

export function isTextPhrase(spec: PhraseSpec): spec is TextPhraseSpec {
  return spec?.type === 'text';
}

export function getHeadingWeight(pType: string) {
  if (pType?.startsWith('heading')) {
    const weight = Number(pType?.slice(-1));
    if (weight >= 1 && weight <= 6) return weight;
  }
  return NaN;
}

function isString(val: unknown): val is string {
  return typeof val === 'string';
}
