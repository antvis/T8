import { renderLineChart } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { createInlineDocument } from '../utils';

const defaultTrendDescDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }, paragraphType, themeSeedToken) => {
    const chartElement = document.createElement('span');
    renderLineChart(chartElement, { data: detail as number[] }, paragraphType, themeSeedToken);

    return createInlineDocument(chartElement, value, 'suffix');
  },
  style: (value, _, themeSeedToken) => ({
    color: themeSeedToken.colorConclusion,
  }),
  tooltip: false,
};

export const createTrendDesc = createEntityPhraseFactory('trend_desc', defaultTrendDescDescriptor);
