import React from 'react';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';
import { ProportionChart } from '../../../line-charts';

const defaultProportionDescriptor: SpecificEntityPhraseDescriptor = {
  encoding: {
    inlineChart: (value, { origin }) => <ProportionChart data={getProportionNumber(value, origin as number)} />,
  },
  tooltip: {
    title: (value, metadata) => metadata.origin ?? `${metadata.origin}`,
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
