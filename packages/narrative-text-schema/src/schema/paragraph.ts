import { IPhrase } from './phrase';
import { CommonProps, DefaultCustomBlockStructureGeneric, DefaultCustomPhraseGeneric } from './common';

export type IParagraph<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = (ITextParagraph<P> | IBulletsParagraph<P> | IPlotParagraph | S) & CommonProps;

type ITextParagraph<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = {
  type: 'normal';
  phrases: IPhrase<P>[];
};

type IBulletsParagraph<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = {
  type: 'bullets';
  isOrder: boolean;
  bullets: IBulletItem<P>[];
};

export type IBulletItem<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = CommonProps & {
  type: 'bullet-item';
  phrases: IPhrase<P>[];
  // nested list
  subBullet?: IBulletsParagraph<P>;
};

interface IPlotParagraph {
  type: 'plot';
  spec: unknown;
}
