import { CSSProperties } from 'react';
import { FilterItem } from './data';

export type DefaultCustomPhraseGeneric = Record<string, unknown>;

// P used for custom phrase;
export type IPhrase<P = DefaultCustomPhraseGeneric> = ITextPhrase | IEntityPhrase | ICustomPhrase<P>;

export interface ITextPhrase {
  type: 'text';
  value: string;
  styles?: CSSProperties;
}

export interface IEntityPhrase {
  type: 'entity';
  value?: string;
  metadata?: MetaData;
  styles?: CSSProperties;
}

export interface ICustomPhrase<P> {
  type: 'custom';
  value?: string;
  metadata?: P;
  styles?: CSSProperties;
}

export type ValueAssessment = 'positive' | 'negative' | 'equal';

type MetaData =
  | {
      entityType: 'metric_name';
      detail?: string;
    }
  | {
      entityType: 'metric_value' | 'ratio_value' | 'contribute_ratio';
      assessment?: ValueAssessment;
      data?: number;
      format?: string;
    }
  | {
      entityType: 'delta_value';
      assessment?: ValueAssessment;
      data?: number;
      format?: string;
      detail?: [number, number];
    }
  | {
      entityType: 'trend_desc';
      // TODO support multi line
      detail?: number[];
    }
  | {
      entityType: 'dim_value';
      detail?: FilterItem;
    };

export type IEntityType = MetaData['entityType'];
