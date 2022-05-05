import styled from 'styled-components';
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE, SMALL_FONT_SIZE } from './constants';
import { ThemeProps } from '../interface';

export const Container = styled.div<ThemeProps>`
  font-family: PingFangSC, sans-serif;
  color: ${DEFAULT_FONT_COLOR};
  font-size: ${({ size = 'normal' }) => (size === 'small' ? SMALL_FONT_SIZE : DEFAULT_FONT_SIZE)};
`;
