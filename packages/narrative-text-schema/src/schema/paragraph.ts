import { PhraseSpec } from './phrase';
import { CommonProps, DefaultCustomBlockStructureGeneric, DefaultCustomPhraseGeneric } from './common';

export type ParagraphSpec<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = (TextParagraphSpec<P> | BulletsParagraphSpec<P> | S) & CommonProps;

type TextParagraphSpec<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = {
  type: 'normal';
  phrases: PhraseSpec<P>[];
};

type BulletsParagraphSpec<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = {
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
