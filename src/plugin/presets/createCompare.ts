import { ComponentChildren } from 'preact';
import { ValueAssessment, EntityMetaData } from '../../schema';
// import { isNumber } from '../../utils';
// import { ArrowDown, ArrowUp } from '../../assets/icons';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../plugin-protocol.type';
import { getPrefixCls } from '../../utils';
import { seedToken } from '../../theme';
import { createDocumentFragment } from '../tools';

const defaultDeltaValueDescriptor: SpecificEntityPhraseDescriptor = {
  classNames: (value, { assessment }) => [getPrefixCls(`value-${assessment}`)],
  getText: getAssessmentText,
  render: (value, { assessment }) => {
    return createDocumentFragment(getComparePrefix(assessment, ['-', '+']), value, 'prefix');
  },
  style: (value, { assessment }) => ({
    color: getCompareColor(assessment),
  }),
  // tooltip: {
  //   title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  // },
};

export const createDeltaValue = createEntityPhraseFactory('delta_value', defaultDeltaValueDescriptor);

const defaultRatioValueDescriptor: SpecificEntityPhraseDescriptor = {
  classNames: (value, { assessment }) => [getPrefixCls(`value-${assessment}`)],
  getText: getAssessmentText,
  render: (value, { assessment }) => {
    return createDocumentFragment(getComparePrefix(assessment, ['-', '+']), value, 'prefix');
  },
  style: (value, { assessment }) => ({
    color: getCompareColor(assessment),
  }),
  // tooltip: {
  //   title: (value, metadata) => (isNumber(metadata.origin) ? `${metadata.origin}` : null),
  // },
};

export const createRatioValue = createEntityPhraseFactory('ratio_value', defaultRatioValueDescriptor);

function getCompareColor(assessment: ValueAssessment) {
  let color;
  if (assessment === 'positive') color = seedToken.colorPositive;
  if (assessment === 'negative') color = seedToken.colorNegative;
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
