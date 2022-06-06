import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';

const defaultMetricNameDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    fontWeight: 'bold',
  },
};

export const createMetricName = createEntityPhraseFactory('metric_name', defaultMetricNameDescriptor);
