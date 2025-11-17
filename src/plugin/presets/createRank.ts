import { renderRankChart } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { createInlineDocument } from '../utils';

const defaultRankDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }, paragraphType, themeSeedToken) => {
    const chartElement = document.createElement('span');
    renderRankChart(chartElement, { data: detail as number[] }, paragraphType, themeSeedToken);

    return createInlineDocument(chartElement, value, 'suffix');
  },
  tooltip: false,
};

export const createRank = createEntityPhraseFactory('rank', defaultRankDescriptor);
