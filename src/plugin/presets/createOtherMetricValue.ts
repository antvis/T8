// import { isNumber } from 'lodash';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { seedToken } from '../../theme';
import { isNumber } from '../../utils';

const defaultOtherMetricValueDescriptor: SpecificEntityPhraseDescriptor = {
  style: () => ({
    fontWeight: 'bold',
    color: seedToken.colorOtherValue,
  }),
  tooltip: {
    title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createOtherMetricValue = createEntityPhraseFactory(
  'other_metric_value',
  defaultOtherMetricValueDescriptor,
);
