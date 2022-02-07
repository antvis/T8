import { IPhrase } from '@antv/narrative-text-schema';
import { CustomEntityEncoding } from '../interface';

export interface BasicPhraseProps {
  phrase: IPhrase;
  customEntityEncoding?: CustomEntityEncoding;
}
