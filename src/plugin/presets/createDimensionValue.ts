import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';

const defaultDimensionValueDescriptor: SpecificEntityPhraseDescriptor = {
  style: (value, _, themeSeedToken) => ({
    color: themeSeedToken.colorDimensionValue,
  }),
  tooltip: false,
};

export const createDimensionValue = createEntityPhraseFactory('dim_value', defaultDimensionValueDescriptor);
