import { renderSeasonalityChart, SeasonalityChartConfig } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { createInlineDocument } from '../utils';

const defaultSeasonalityDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }, paragraphType, themeSeedToken) => {
    const chartElement = document.createElement('span');

    const { data, range } = detail as SeasonalityChartConfig;
    renderSeasonalityChart(chartElement, { data, range }, paragraphType, themeSeedToken);
    return createInlineDocument(chartElement, value, 'suffix');
  },
  tooltip: false,
};

export const createSeasonality = createEntityPhraseFactory('seasonality', defaultSeasonalityDescriptor);
