import { SingleLine } from '../../charts';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { seedToken } from '../../theme';
import { render as preactRender, h } from 'preact';
import { createDocumentFragment } from '../utils';

const defaultTrendDescDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }) => {
    const chartElement = document.createElement('span');
    preactRender(h(SingleLine, { data: detail as number[] }), chartElement);

    return createDocumentFragment(chartElement, value, 'suffix');
  },
  style: () => ({
    color: seedToken.colorConclusion,
  }),
  tooltip: false,
};

export const createTrendDesc = createEntityPhraseFactory('trend_desc', defaultTrendDescDescriptor);
