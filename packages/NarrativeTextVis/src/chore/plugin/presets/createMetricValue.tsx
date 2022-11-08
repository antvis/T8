import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';
import { seedToken } from '../../../theme';

const defaultMetricValueDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    color: seedToken.colorMetricValue,
  },
  tooltip: {
    title: (value, metadata) => metadata.origin ?? `${metadata.origin}`,
  },
};

export const createMetricValue = createEntityPhraseFactory('metric_value', defaultMetricValueDescriptor);
