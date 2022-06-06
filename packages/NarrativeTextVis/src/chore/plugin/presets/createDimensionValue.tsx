import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';

const defaultDimensionValueDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    underline: true,
  },
};

export const createDimensionValue = createEntityPhraseFactory('dim_value', defaultDimensionValueDescriptor);
