import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { seedToken } from '../../theme';

const defaultTimeDescDescriptor: SpecificEntityPhraseDescriptor = {
  style: () => ({
    color: seedToken.colorDimensionValue,
  }),
  tooltip: false,
};

export const createTimeDesc = createEntityPhraseFactory('time_desc', defaultTimeDescDescriptor);
