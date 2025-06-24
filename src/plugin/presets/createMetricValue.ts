import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { isNumber } from '../../utils';

const defaultMetricValueDescriptor: SpecificEntityPhraseDescriptor = {
  style: (value, _, themeSeedToken) => ({
    color: themeSeedToken.colorMetricValue,
  }),
  tooltip: {
    title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createMetricValue = createEntityPhraseFactory('metric_value', defaultMetricValueDescriptor);
