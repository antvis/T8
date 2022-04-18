import { PhraseSpec } from '@antv/narrative-text-schema';
import { CustomEntityEncoding } from '../interface';

export interface BasicPhraseProps {
  phrase: PhraseSpec;
  customEntityEncoding?: CustomEntityEncoding;
}
