import { CSSProperties } from 'react';
import { IPhrase, DefaultCustomPhraseGeneric } from './phrase';

export type IParagraph<P = DefaultCustomPhraseGeneric> = TextParagraph<P> | BulletsParagraph<P> | PlotParagraph;

interface TextParagraph<P> {
  type: 'normal';
  phrases: IPhrase<P>[];
  styles?: CSSProperties;
}

interface BulletsParagraph<P> {
  type: 'bullets';
  isOrder: boolean;
  bullets: BulletItem<P>[];
  styles?: CSSProperties;
}

interface BulletItem<P> {
  type: 'bullet-item';
  phrases: IPhrase<P>[];
  // nested list
  subBullet?: BulletsParagraph<P>;
  styles?: CSSProperties;
}

interface PlotParagraph {
  type: 'plot';
  // TODO 待 antv-spec 发包稳定后可替换之
  spec: AntVSpec;
  styles?: CSSProperties;
}

/**
 * @deprecated
 */
type AntVSpec = unknown;
