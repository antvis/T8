import styled from 'styled-components';
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE, SMALL_FONT_SIZE } from './constants';
import { ThemeProps } from '../interface';

export const Bullet = styled.div<ThemeProps>`
  padding-left: 16px;
  font-family: PingFangSC, sans-serif;
  color: ${DEFAULT_FONT_COLOR};
  font-size: ${({ size = 'normal' }) => (size === 'small' ? SMALL_FONT_SIZE : DEFAULT_FONT_SIZE)};
  margin-bottom: 4px;
`;

export const Ol = styled(Bullet)`
  list-style-type: decimal;
`;

export const Ul = styled(Bullet)`
  list-style-type: disc;
`;

export const Li = styled.li`
  list-style: inherit;
  line-height: 1.74;

  ::marker {
    margin-right: -8px;
  }
`;
