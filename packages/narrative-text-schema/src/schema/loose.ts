import { CommonProps } from './common';

type LooseCommonProps = CommonProps & {
  [key: string]: unknown;
};

export type LoosePhraseSpec = LooseCommonProps & {
  type: string;
  value?: string;
  metadata?: {
    [key: string]: unknown;
  };
};

export type LooseParagraphSpec = LooseCommonProps & {
  type: string;
  isOrder?: boolean;
  phrases?: LoosePhraseSpec[];
  bullets?: LooseParagraphSpec[];
  subBullet?: LooseParagraphSpec;
  metadata?: {
    [key: string]: unknown;
  };
};

export type LooseSectionSpec = LooseCommonProps & {
  type?: string;
  paragraphs?: LooseParagraphSpec[];
  metadata?: {
    [key: string]: unknown;
  };
};

export type LooseNarrativeTextSpec = LooseCommonProps & {
  headline?: LooseParagraphSpec;
  sections?: LooseSectionSpec[];
};
