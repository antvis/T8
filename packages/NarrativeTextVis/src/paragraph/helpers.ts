import {
  ParagraphSpec,
  HeadingParagraphSpec,
  TextParagraphSpec,
  BulletsParagraphSpec,
} from '@antv/narrative-text-schema';
import { startsWith, slice, toNumber, isNaN } from 'lodash';

export function getHeadingWeight(pType: string) {
  if (startsWith(pType, 'heading')) {
    const weight = toNumber(slice(pType, -1));
    if (weight >= 1 && weight <= 6) return weight;
  }
  return NaN;
}

export function isHeadingParagraph(spec: ParagraphSpec<any, any>): spec is HeadingParagraphSpec {
  const weight = getHeadingWeight(spec?.type);
  return startsWith(spec?.type, 'heading') && !isNaN(weight);
}

export function isTextParagraph(spec: ParagraphSpec<any, any>): spec is TextParagraphSpec {
  return spec?.type === 'normal';
}

export function isBulletParagraph(spec: ParagraphSpec<any, any>): spec is BulletsParagraphSpec {
  return spec?.type === 'bullets';
}
