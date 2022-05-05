import styled from 'styled-components';
import { ValueAssessment } from '@antv/narrative-text-schema';
import { PhraseType, ThemeProps } from '../interface';
import {
  DEFAULT_FONT_SIZE,
  ENTITY_VALUE_COLOR,
  ENTITY_DIM_COLOR,
  ENTITY_NEG_COLOR,
  ENTITY_POS_COLOR,
  ENTITY_CONTRIB_COLOR,
  SMALL_FONT_SIZE,
} from './constants';

function getColor(type: PhraseType, assessment: ValueAssessment) {
  let assessmentColor = '';
  if (assessment === 'positive') assessmentColor = ENTITY_POS_COLOR;
  if (assessment === 'negative') assessmentColor = ENTITY_NEG_COLOR;

  switch (type) {
    case 'metric_value':
      return ENTITY_VALUE_COLOR;
    case 'delta_value':
      return assessmentColor;
    case 'ratio_value':
      return assessmentColor;
    case 'contribute_ratio':
      return ENTITY_CONTRIB_COLOR;
    case 'dim_value':
      return ENTITY_DIM_COLOR;
    default:
      return '#404040';
  }
}

export const Entity = styled.span<ThemeProps & { type: PhraseType; assessment: ValueAssessment }>`
  display: flex;
  display: inline-block;
  align-items: center;
  box-sizing: border-box;
  font-size: ${({ size = 'normal' }) => (size === 'small' ? SMALL_FONT_SIZE : DEFAULT_FONT_SIZE)};
  font-family: Roboto-Medium, sans-serif;
  line-height: 1.5em;
  border-radius: 2px;
  font-weight: ${(props) => (props.type === 'metric_name' || props.type === 'other_metric_value' ? 'bold' : undefined)};
  color: ${(props) => getColor(props.type, props.assessment)};
  text-decoration: ${(props) => (props.type === 'dim_value' || props.type === 'time_desc' ? 'underline' : undefined)};
`;
