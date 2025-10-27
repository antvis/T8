import { ValueAssessment, EntityMetaData } from '../../schema';
// import { ArrowDown, ArrowUp } from '../../assets/icons';
import { createEntityPhraseFactory } from '../createEntityPhraseFactory';
import { SpecificEntityPhraseDescriptor } from '../types';
import { getPrefixCls, isNumber } from '../../utils';
import { createInlineDocument } from '../utils';
import { SeedTokenOptions } from '../../theme';
import { getElementFontSize } from '../../utils';

const MARGIN_RIGHT = 1;

const defaultDeltaValueDescriptor: SpecificEntityPhraseDescriptor = {
  classNames: (value, { assessment }) => [getPrefixCls(`value-${assessment}`)],
  getText: getAssessmentText,
  render: (value, { assessment }) => {
    return createInlineDocument(getComparePrefix(assessment, ['-', '+']), value, 'prefix');
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
  render: (value, { assessment }, paragraphType, themeSeedToken) => {
    const fontSize = getElementFontSize(paragraphType, themeSeedToken);
    const prefix = getComparePrefix(assessment, [
      createArrow('up', fontSize * 0.8),
      createArrow('down', fontSize * 0.8),
    ]);
    return createInlineDocument(prefix as HTMLElement | string, value, 'prefix');
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

function getComparePrefix(
  assessment: ValueAssessment,
  [neg, pos]: [Element | string, Element | string],
): Element | string {
  let prefix: Element | string | null = null;
  if (assessment === 'negative') prefix = neg;
  if (assessment === 'positive') prefix = pos;
  return prefix;
}

function getAssessmentText(value: string, metadata: EntityMetaData) {
  return `${metadata?.assessment === 'negative' ? '-' : ''}${value}`;
}

function createArrow(direction: 'up' | 'down', fontSize: number): Element {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.setAttribute('width', `${fontSize}px`);
  svg.setAttribute('height', `${fontSize}px`);
  svg.setAttribute('viewBox', '0 0 8 9');
  svg.style.marginRight = `${MARGIN_RIGHT}px`;
  svg.setAttribute('version', '1.1');

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', 'translate(-2.000000, -2.000000)');

  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('fill', 'currentColor');

  const points =
    direction === 'down'
      ? '6 2 9.5 11 2.5 11' // arrow down
      : '6 11 9.5 2 2.5 2'; // arrow up

  polygon.setAttribute('points', points);

  g.appendChild(polygon);
  svg.appendChild(g);

  return svg;
}
