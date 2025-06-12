import { ComponentChildren } from 'preact';
import { ValueAssessment, EntityMetaData } from '../../schema';
// import { ArrowDown, ArrowUp } from '../../assets/icons';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { getPrefixCls, isNumber } from '../../utils';
import { createDocumentFragment } from '../utils';
import { SeedTokenOptions } from '../../theme';

const defaultDeltaValueDescriptor: SpecificEntityPhraseDescriptor = {
  classNames: (value, { assessment }) => [getPrefixCls(`value-${assessment}`)],
  getText: getAssessmentText,
  render: (value, { assessment }) => {
    return createDocumentFragment(getComparePrefix(assessment, ['-', '+']), value, 'prefix');
  },
  style: (value, { assessment }, themeSeedToken) => ({
    color: getCompareColor(assessment, themeSeedToken),
  }),
  tooltip: {
    title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createDeltaValue = createEntityPhraseFactory('delta_value', defaultDeltaValueDescriptor);

const defaultRatioValueDescriptor: SpecificEntityPhraseDescriptor = {
  classNames: (value, { assessment }) => [getPrefixCls(`value-${assessment}`)],
  getText: getAssessmentText,
  render: (value, { assessment }) => {
    return createDocumentFragment(getComparePrefix(assessment, ['-', '+']), value, 'prefix');
  },
  style: (value, { assessment }, themeSeedToken) => ({
    color: getCompareColor(assessment, themeSeedToken),
  }),
  tooltip: {
    title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  },
};

export const createRatioValue = createEntityPhraseFactory('ratio_value', defaultRatioValueDescriptor);

function getCompareColor(assessment: ValueAssessment, themeSeedToken: SeedTokenOptions) {
  let color;
  if (assessment === 'positive') color = themeSeedToken.colorPositive;
  if (assessment === 'negative') color = themeSeedToken.colorNegative;
  return color;
}

function getComparePrefix(assessment: ValueAssessment, [neg, pos]: [ComponentChildren, ComponentChildren]): string {
  let prefix = null;
  if (assessment === 'negative') prefix = neg;
  if (assessment === 'positive') prefix = pos;
  return prefix;
}

function getAssessmentText(value: string, metadata: EntityMetaData) {
  return `${metadata?.assessment === 'negative' ? '-' : ''}${value}`;
}
