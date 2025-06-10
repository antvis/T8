// import { isNumber } from 'lodash';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { seedToken } from '../../theme';
import { isNumber } from '../../utils';

const defaultContributeRatioDescriptor: SpecificEntityPhraseDescriptor = {
  style: () => ({
    color: seedToken.colorConclusion,
  }),
  tooltip: {
    title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createContributeRatio = createEntityPhraseFactory('contribute_ratio', defaultContributeRatioDescriptor);
