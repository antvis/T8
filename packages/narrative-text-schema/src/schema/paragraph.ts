import { PhraseSpec } from './phrase';
import { CommonProps, DefaultCustomBlockStructureGeneric, DefaultCustomPhraseGeneric } from './common';

export type ParagraphSpec<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = HeadingParagraphSpec<P> | TextParagraphSpec<P> | BulletsParagraphSpec<P> | S;

// As nouns the difference between heading and headline is that
// heading is the title or topic of a document, article, chapter, or of a section thereof
// while headline is a heading or title of an article.
export type HeadingParagraphSpec<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = CommonProps & {
  type: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6';
  phrases: PhraseSpec<P>[];
};

export type TextParagraphSpec<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = CommonProps & {
  type: 'normal';
  phrases: PhraseSpec<P>[];
};

export type BulletsParagraphSpec<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = CommonProps & {
  type: 'bullets';
  isOrder: boolean;
  bullets: BulletItemSpec<P>[];
};

export type BulletItemSpec<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = CommonProps & {
  type: 'bullet-item';
  phrases: PhraseSpec<P>[];
  // nested list
  subBullet?: BulletsParagraphSpec<P>;
};
