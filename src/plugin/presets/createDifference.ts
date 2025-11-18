import { renderDifferenceChart } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { createInlineDocument } from '../utils';

const defaultDifferenceDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }, paragraphType, themeSeedToken) => {
    const chartElement = document.createElement('span');
    renderDifferenceChart(chartElement, { data: detail as number[] }, paragraphType, themeSeedToken);
    return createInlineDocument(chartElement, value, 'suffix');
  },
  tooltip: false,
};

export const createDifference = createEntityPhraseFactory('difference', defaultDifferenceDescriptor);
