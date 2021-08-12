import { ReactNode } from 'react';
import { ICustomPhrase, DefaultCustomPhraseGeneric } from '@antv/text-schema';

export type DetailChartDisplayType = 'inline' | 'tooltip';
export type CustomPhraseRender<P = DefaultCustomPhraseGeneric> = (phrase: ICustomPhrase<P>) => ReactNode;
