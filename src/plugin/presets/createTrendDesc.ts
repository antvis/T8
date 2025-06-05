// import React from 'react';
// import { isArray } from 'lodash';
import { SingleLineChart } from '../../vis-components';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { seedToken } from '../../theme';
import { render as preactRender, h } from 'preact';
import { createDocumentFragment } from '../tools';

const defaultTrendDescDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { detail }) => {
    const chartElement = document.createElement('span');
    preactRender(h(SingleLineChart, { data: detail as number[] }), chartElement);

    return createDocumentFragment(chartElement, value, 'suffix');
  },
  style: () => ({
    color: seedToken.colorConclusion,
  }),
  tooltip: false,
};

export const createTrendDesc = createEntityPhraseFactory('trend_desc', defaultTrendDescDescriptor);
