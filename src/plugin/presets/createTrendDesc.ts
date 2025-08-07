import { SingleLine } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { render as preactRender, h } from 'preact';
import { createInlineDocument } from '../utils';

const defaultTrendDescDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }) => {
    const chartElement = document.createElement('span');
    preactRender(h(SingleLine, { data: detail as number[] }), chartElement);

    return createInlineDocument(chartElement, value, 'suffix');
  },
  style: (value, _, themeSeedToken) => ({
    color: themeSeedToken.colorConclusion,
  }),
  tooltip: false,
};

export const createTrendDesc = createEntityPhraseFactory('trend_desc', defaultTrendDescDescriptor);
