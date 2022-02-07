import { ReactNode } from 'react';
import {
  IEntityType,
  ICustomPhrase,
  ValueAssessment,
  DefaultCustomPhraseGeneric,
  DefaultCustomBlockStructureGeneric,
} from '@antv/narrative-text-schema';

export type CustomPhraseRender<P = DefaultCustomPhraseGeneric> = (phrase: ICustomPhrase<P>) => ReactNode;

type AssessmentEncodingChannels = Omit<EncodingChannels, 'assessment'>;

/** encoding channel of entity */
export interface EncodingChannels {
  // TODO 其他文字的视觉通道可按需增加
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  assessment?: Partial<Record<ValueAssessment, AssessmentEncodingChannels>>;
}

export type CustomEntityEncoding = Partial<Record<IEntityType, EncodingChannels>>;

export type WithPhraseProps<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = {
  /** custom entity encoding */
  customEntityEncoding?: CustomEntityEncoding;
  /** custom phrase render comp, is not defined, it will use text as default */
  customPhraseRender?: CustomPhraseRender<P>;
};

export type WithCustomBlockElement<S extends DefaultCustomBlockStructureGeneric = null> = {
  /** custom block ele render comp, is not defined, it will return null */
  customBlockElementRender?: (spec: S) => ReactNode;
};
