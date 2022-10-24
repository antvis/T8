import styled from 'styled-components';
import { ThemeProps } from '../interface';
import { seedToken } from '../theme';

export const Entity = styled.span<ThemeProps>`
  display: flex;
  display: inline-block;
  align-items: center;
  box-sizing: border-box;
  font-size: ${({ size = 'normal' }) => (size === 'small' ? seedToken.fontSizeSmall : seedToken.fontSizeBase)};
  font-family: Roboto-Medium, sans-serif;
  line-height: 1.5em;
  border-radius: 2px;
  color: ${seedToken.colorEntityBase};
`;
