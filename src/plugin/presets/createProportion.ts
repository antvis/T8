import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { Proportion } from '../../vis-components';
import { render as preactRender, h } from 'preact';
import { createDocumentFragment } from '../tools';
import { isNumber } from '../../utils';

const defaultProportionDescriptor: SpecificEntityPhraseDescriptor = {
  render: (value, { origin }) => {
    const chartElement = document.createElement('span');
    preactRender(h(Proportion, { data: getProportionNumber(value, origin as number) }), chartElement);

    return createDocumentFragment(chartElement, value, 'suffix');
  },
  tooltip: {
    title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createProportion = createEntityPhraseFactory('proportion', defaultProportionDescriptor);

/** text & entity */
const isNaN = (v: unknown) => Number.isNaN(v);

function getProportionNumber(text: string, value?: number | undefined): number {
  if (value && !isNaN(value)) return value;
  if (text?.endsWith('%')) {
    const percentageValue = text?.replace(/%$/, '');
    if (!isNaN(Number(percentageValue))) return Number(percentageValue) / 100;
  }
  return NaN;
}
