import { PhraseSpec } from './phrase';
import { CommonProps, CustomBlockElement } from './common';

export type ParagraphSpec = HeadingParagraphSpec | TextParagraphSpec | BulletsParagraphSpec | CustomBlockElement;

export enum ParagraphType {
  HEADING1 = 'heading1',
  HEADING2 = 'heading2',
  HEADING3 = 'heading3',
  HEADING4 = 'heading4',
  HEADING5 = 'heading5',
  HEADING6 = 'heading6',
  NORMAL = 'normal',
  BULLETS = 'bullets',
}

// As nouns the difference between heading and headline is that
// heading is the title or topic of a document, article, chapter, or of a section thereof
// while headline is a heading or title of an article.
export type HeadingParagraphSpec = CommonProps & {
  type:
    | ParagraphType.HEADING1
    | ParagraphType.HEADING2
    | ParagraphType.HEADING3
    | ParagraphType.HEADING4
    | ParagraphType.HEADING5
    | ParagraphType.HEADING6;
  phrases: PhraseSpec[];
};

export type TextParagraphSpec = CommonProps & {
  type: ParagraphType.NORMAL;
  phrases: PhraseSpec[];
};

export type BulletsParagraphSpec = CommonProps & {
  type: ParagraphType.BULLETS;
  isOrder: boolean;
  bullets: BulletItemSpec[];
};

export type BulletItemSpec = CommonProps & {
  type: 'bullet-item';
  phrases: PhraseSpec[];
  // nested list
  subBullet?: BulletsParagraphSpec;
};
