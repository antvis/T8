import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';
import { seedToken } from '../../theme';

const defaultDimensionValueDescriptor: SpecificEntityPhraseDescriptor = {
  style: () => ({
    color: seedToken.colorDimensionValue,
  }),
  tooltip: false,
};

export const createDimensionValue = createEntityPhraseFactory('dim_value', defaultDimensionValueDescriptor);
