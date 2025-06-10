// import { isNumber } from 'lodash';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { seedToken } from '../../theme';
import { isNumber } from '../../utils';

const defaultMetricValueDescriptor: SpecificEntityPhraseDescriptor = {
  style: () => ({
    color: seedToken.colorMetricValue,
  }),
  tooltip: {
    title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createMetricValue = createEntityPhraseFactory('metric_value', defaultMetricValueDescriptor);
