import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';
import { seedToken } from '../../../theme';

const defaultOtherMetricValueDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    fontWeight: 'bold',
    color: seedToken.colorOtherValue,
  },
  tooltip: {
    title: (value, metadata) => metadata.origin ?? `${metadata.origin}`,
  },
};

export const createOtherMetricValue = createEntityPhraseFactory(
  'other_metric_value',
  defaultOtherMetricValueDescriptor,
);
