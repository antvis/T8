import { renderAssociationChart } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { createInlineDocument } from '../utils';

const defaultAssociationDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }, paragraphType, themeSeedToken) => {
    const chartElement = document.createElement('span');
    renderAssociationChart(chartElement, { data: detail as { x: number; y: number }[] }, paragraphType, themeSeedToken);
    return createInlineDocument(chartElement, value, 'suffix');
  },
  tooltip: false,
};

export const createAssociation = createEntityPhraseFactory('association', defaultAssociationDescriptor);
