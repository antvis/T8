import { isObject, isString } from '../../utils';
import {
  ParagraphType,
  ParagraphSpec,
  TextParagraphSpec,
  BulletsParagraphSpec,
  HeadingParagraphSpec,
} from '../paragraph';
import { EntityType, PhraseType, PhraseSpec, CustomPhraseSpec, TextPhraseSpec, EntityPhraseSpec } from '../phrase';
import { CustomBlockElement } from '../common';
import type { SectionSpec, StandardSectionSpec } from '../structure';

export function isCustomSection(spec: SectionSpec): spec is CustomBlockElement {
  return !!spec && isObject(spec) && 'customType' in spec;
}

export function isCustomParagraph(spec: ParagraphSpec): spec is CustomBlockElement {
  return isObject(spec) && 'customType' in spec;
}

export function isStandardSection(spec: SectionSpec): spec is StandardSectionSpec {
  return isObject(spec) && 'paragraphs' in spec && Array.isArray(spec?.paragraphs);
}

export function isTextParagraph(spec: ParagraphSpec): spec is TextParagraphSpec {
  return isObject(spec) && spec?.type === ParagraphType.NORMAL && Array.isArray(spec?.phrases);
}

export function isBulletParagraph(spec: ParagraphSpec): spec is BulletsParagraphSpec {
  return isObject(spec) && spec?.type === ParagraphType.BULLETS && Array.isArray(spec?.bullets);
}

export function isHeadingParagraph(spec: ParagraphSpec): spec is HeadingParagraphSpec {
  if (!!spec && isObject(spec) && 'type' in spec && isString(spec.type)) {
    const weight = getHeadingWeight(spec?.type);
    return spec.type.startsWith('heading') && !Number.isNaN(weight);
  }
  return false;
}

export function isCustomPhrase(spec: PhraseSpec): spec is CustomPhraseSpec {
  return spec.type === PhraseType.CUSTOM && !!spec?.metadata?.customType;
}

export function isEntityPhrase(spec: PhraseSpec): spec is EntityPhraseSpec {
  return (
    spec.type === PhraseType.ENTITY && !!spec?.metadata?.entityType && EntityType.includes(spec?.metadata?.entityType)
  );
}

export function isTextPhrase(spec: PhraseSpec): spec is TextPhraseSpec {
  return spec.type === PhraseType.TEXT;
}

export function getHeadingWeight(pType: string) {
  if (pType?.startsWith('heading')) {
    const weight = Number(pType?.slice(-1));
    if (weight >= 1 && weight <= 6) return weight;
  }
  return NaN;
}
