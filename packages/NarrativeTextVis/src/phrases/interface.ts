import { IPhrase } from '@antv/text-schema';
import { CustomEntityEncoding } from '../interface';

export interface BasicPhraseProps {
  phrase: IPhrase;
  customEntityEncoding?: CustomEntityEncoding;
}
