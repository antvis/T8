import { NarrativeTextSpec, SectionSpec } from '../../schema/structure';
import { ParagraphSpec, BulletsParagraphSpec, BulletItemSpec, ParagraphType } from '../../schema/paragraph';
import { PhraseSpec } from '../../schema/phrase';
import { isValidPhrase } from './phrases';
import { isHeadingOrText, isBulletsParagraph } from './paragraphs';

export function validateNarrativeSpec(root: NarrativeTextSpec): NarrativeTextSpec {
  if (!root || typeof root !== 'object') return root;

  if (root.headline) {
    if (root.headline.type !== 'headline' || !Array.isArray(root.headline.phrases)) {
      delete root.headline;
    } else {
      root.headline.phrases = root.headline.phrases.filter(isValidPhrase);
    }
  }

  const rootObj = root as NarrativeTextSpec & Record<string, unknown>;
  if (!rootObj.headline && 'h' in rootObj) {
    rootObj.headline = rootObj.h as NarrativeTextSpec['headline'];
    delete rootObj.h;
  }

  if (rootObj.sections) {
    if (Array.isArray(rootObj.sections)) {
      rootObj.sections = rootObj.sections.map(validateSection).filter(Boolean) as SectionSpec[];
    } else {
      delete rootObj.sections;
    }
  } else if (Array.isArray(rootObj.s as unknown[])) {
    rootObj.sections = (rootObj.s as unknown[])
      .map((section) => validateSection(section as SectionSpec))
      .filter(Boolean) as SectionSpec[];
    delete rootObj.s;
  }

  return root;
}

export function validateSection(section: SectionSpec): SectionSpec | null {
  if (!section || typeof section !== 'object') return null;
  const paragraphs = (section as SectionSpec & { paragraphs?: unknown }).paragraphs;

  if (Array.isArray(paragraphs)) {
    (section as SectionSpec & { paragraphs?: ParagraphSpec[] }).paragraphs = paragraphs
      .map((paragraph) => validateParagraph(paragraph as ParagraphSpec))
      .filter(Boolean) as ParagraphSpec[];
  } else if (paragraphs && typeof paragraphs === 'object' && 'type' in (paragraphs as Record<string, unknown>)) {
    const validated = validateParagraph(paragraphs as ParagraphSpec);
    (section as SectionSpec & { paragraphs?: ParagraphSpec[] }).paragraphs = validated ? [validated] : [];
  } else {
    (section as SectionSpec & { paragraphs?: ParagraphSpec[] }).paragraphs = [];
  }
  return section;
}

export function validateParagraph(paragraph: ParagraphSpec): ParagraphSpec | null {
  if (!paragraph || typeof paragraph !== 'object') return null;
  const type = paragraph.type;
  if (!type) return null;

  if (isHeadingOrText(paragraph)) {
    if (!Array.isArray((paragraph as ParagraphSpec & { phrases: PhraseSpec[] }).phrases)) return null;
    const phrases = (paragraph as ParagraphSpec & { phrases: PhraseSpec[] }).phrases.filter(isValidPhrase);
    if (!phrases.length) return null;
    (paragraph as ParagraphSpec & { phrases: PhraseSpec[] }).phrases = phrases;
    return paragraph;
  }

  if (isBulletsParagraph(paragraph)) {
    if (!Array.isArray(paragraph.bullets) || typeof paragraph.isOrder !== 'boolean') return null;
    paragraph.bullets = paragraph.bullets.map(validateBulletItem).filter(Boolean) as BulletItemSpec[];
    return paragraph.bullets.length ? paragraph : null;
  }

  if ((paragraph as ParagraphSpec & { customType?: string }).customType) return paragraph;
  return null;
}

export function validateBulletItem(item: BulletItemSpec): BulletItemSpec | null {
  if (!item || typeof item !== 'object') return null;
  if (item.type !== 'bullet-item') return null;
  if (!Array.isArray(item.phrases)) return null;
  item.phrases = item.phrases.filter(isValidPhrase);
  if (item.phrases.length === 0) return null;

  if (item.subBullet) {
    const validated = validateParagraph(item.subBullet);
    if (validated && validated.type === ParagraphType.BULLETS) {
      item.subBullet = validated as BulletsParagraphSpec;
    } else {
      delete item.subBullet;
    }
  }

  if (item.subBullet && (!item.subBullet.bullets || item.subBullet.bullets.length === 0)) {
    delete item.subBullet;
  }
  return item;
}
