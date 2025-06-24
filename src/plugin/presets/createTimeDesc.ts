import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';

const defaultTimeDescDescriptor: SpecificEntityPhraseDescriptor = {
  style: (value, _, themeSeedToken) => ({
    color: themeSeedToken.colorDimensionValue,
  }),
  tooltip: false,
};

export const createTimeDesc = createEntityPhraseFactory('time_desc', defaultTimeDescDescriptor);
