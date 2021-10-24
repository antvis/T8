import { CSSProperties } from 'react';
import { FilterItem } from './data';
import { DefaultCustomPhraseGeneric } from './common';

// P used for custom phrase;
export type IPhrase<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> =
  | ITextPhrase
  | IEntityPhrase
  | ICustomPhrase<P>;

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
    }
  | {
      entityType: 'metric_value';
    }
  | {
      entityType: 'other_metric_value';
    }
  | {
      entityType: 'contribute_ratio';
    }
  | {
      entityType: 'ratio_value';
      assessment?: ValueAssessment;
    }
  | {
      entityType: 'delta_value';
      assessment?: ValueAssessment;
      detail?: [string, string];
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
