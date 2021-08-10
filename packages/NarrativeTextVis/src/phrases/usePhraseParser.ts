import { IPhrase } from '@antv/text-schema';
import { parsePhrase } from '../utils/phrase-parser';

export const usePhraseParser = ({ phrase }: { phrase: IPhrase }) => {
  const pp = parsePhrase(phrase);
  return {
    ...pp,
    content: pp.content,
  };
};
