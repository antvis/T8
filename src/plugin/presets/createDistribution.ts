import { renderDistribution } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { createInlineDocument } from '../utils';

const defaultDistributionDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }, paragraphType, themeSeedToken) => {
    const chartElement = document.createElement('span');
    renderDistribution(chartElement, { data: detail as number[] }, paragraphType, themeSeedToken);
    return createInlineDocument(chartElement, value, 'suffix');
  },
  tooltip: false,
};

export const createDistribution = createEntityPhraseFactory('distribution', defaultDistributionDescriptor);
