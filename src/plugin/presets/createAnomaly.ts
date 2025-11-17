import { renderAnomalyChart } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { createInlineDocument } from '../utils';

const defaultAnomalyDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }, paragraphType, themeSeedToken) => {
    const chartElement = document.createElement('span');
    renderAnomalyChart(chartElement, { data: detail as number[] }, paragraphType, themeSeedToken);
    return createInlineDocument(chartElement, value, 'suffix');
  },
  tooltip: false,
};

export const createAnomaly = createEntityPhraseFactory('anomaly', defaultAnomalyDescriptor);
