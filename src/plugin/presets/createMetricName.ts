import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';
import { seedToken } from '../../theme';

const defaultMetricNameDescriptor: SpecificEntityPhraseDescriptor = {
  style: () => ({
    fontWeight: 500,
    color: seedToken.colorMetricName,
  }),
  tooltip: false,
};

export const createMetricName = createEntityPhraseFactory('metric_name', defaultMetricNameDescriptor);
