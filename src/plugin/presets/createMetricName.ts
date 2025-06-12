import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';

const defaultMetricNameDescriptor: SpecificEntityPhraseDescriptor = {
  style: (value, _, themeSeedToken) => ({
    fontWeight: 500,
    color: themeSeedToken.colorMetricName,
  }),
  tooltip: false,
};

export const createMetricName = createEntityPhraseFactory('metric_name', defaultMetricNameDescriptor);
