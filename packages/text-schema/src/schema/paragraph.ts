import { IPhrase, DefaultCustomPhraseGeneric } from './phrase';

export type IParagraph<P = DefaultCustomPhraseGeneric> = TextParagraph<P> | BulletsParagraph<P>;

interface TextParagraph<P> {
  type: 'normal';
  phrases: IPhrase<P>[];
  styles?: BlockStyles;
}

interface BulletsParagraph<P> {
  type: 'bullets';
  isOrder: boolean;
  // used for nested bullets structure
  bullets: BulletItem<P>[];
  styles?: BlockStyles;
}

interface BulletItem<P> {
  type: 'bullet-item';
  phrases: IPhrase<P>[];
  // used for next level of bullets
  isOrder?: boolean;
  bullets?: BulletItem<P>[];
  styles?: BlockStyles;
}

interface BlockStyles {
  color?: string;
  backgroundColor?: string;
  textAlign: 'left' | 'center' | 'right';
}
