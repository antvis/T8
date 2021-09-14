import { ReactNode } from 'react';
import { ICustomPhrase, DefaultCustomPhraseGeneric } from '@antv/text-schema';

export type DetailChartDisplayType = 'inline' | 'tooltip';
export type CustomPhraseRender<P = DefaultCustomPhraseGeneric> = (phrase: ICustomPhrase<P>) => ReactNode;

export type WithPhraseProps<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = {
  /** use detail data to render chart, define how to display it  */
  detailChartDisplayType?: DetailChartDisplayType;
  /** custom phrase render comp, is not defined, it will use text as default */
  customPhraseRender?: CustomPhraseRender<P>;
};
