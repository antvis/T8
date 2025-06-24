import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { isNumber } from '../../utils';

const defaultContributeRatioDescriptor: SpecificEntityPhraseDescriptor = {
  style: (value, _, themeSeedToken) => ({
    color: themeSeedToken.colorConclusion,
  }),
  tooltip: {
    title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createContributeRatio = createEntityPhraseFactory('contribute_ratio', defaultContributeRatioDescriptor);
