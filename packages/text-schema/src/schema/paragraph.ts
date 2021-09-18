import { AntVSpec } from '@antv/antv-spec';
import { IPhrase } from './phrase';
import { CommonProps, DefaultCustomBlockStructureGeneric, DefaultCustomPhraseGeneric } from './common';

export type IParagraph<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = (TextParagraph<P> | BulletsParagraph<P> | PlotParagraph | S) & CommonProps;

type TextParagraph<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = {
  type: 'normal';
  phrases: IPhrase<P>[];
};

type BulletsParagraph<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = {
  type: 'bullets';
  isOrder: boolean;
  bullets: BulletItem<P>[];
};

type BulletItem<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = CommonProps & {
  type: 'bullet-item';
  phrases: IPhrase<P>[];
  // nested list
  subBullet?: BulletsParagraph<P>;
};

interface PlotParagraph {
  type: 'plot';
  spec: AntVSpec;
}
