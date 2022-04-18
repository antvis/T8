import styled from 'styled-components';
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE } from './constants';

export const P = styled.p`
  font-family: PingFangSC, sans-serif;
  color: ${DEFAULT_FONT_COLOR};
  font-size: ${DEFAULT_FONT_SIZE};
  min-height: 24px;
  line-height: 1.74;
  margin-bottom: 4px;
`;
