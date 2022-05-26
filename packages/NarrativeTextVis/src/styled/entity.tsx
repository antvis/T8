import styled from 'styled-components';
import { ThemeProps } from '../interface';
import { DEFAULT_FONT_SIZE, SMALL_FONT_SIZE } from './constants';

export const Entity = styled.span<ThemeProps>`
  display: flex;
  display: inline-block;
  align-items: center;
  box-sizing: border-box;
  font-size: ${({ size = 'normal' }) => {
    return size === 'small' ? SMALL_FONT_SIZE : DEFAULT_FONT_SIZE;
  }};
  font-family: Roboto-Medium, sans-serif;
  line-height: 1.5em;
  border-radius: 2px;
  color: '#404040';
`;
