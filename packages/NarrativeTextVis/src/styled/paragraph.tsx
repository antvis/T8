import styled from 'styled-components';
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE, SMALL_FONT_SIZE } from './constants';
import { ThemeProps } from '../interface';

export const P = styled.p<ThemeProps>`
  font-family: PingFangSC, sans-serif;
  color: ${DEFAULT_FONT_COLOR};
  font-size: ${({ size = 'normal' }) => (size === 'small' ? SMALL_FONT_SIZE : DEFAULT_FONT_SIZE)};
  min-height: 24px;
  line-height: 24px;
  margin-bottom: 4px;
`;
