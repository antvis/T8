import styled from 'styled-components';
import { DEFAULT_FONT_COLOR, DEFAULT_FONT_SIZE } from './constants';

export const Bullet = styled.div`
  list-style-position: inside;
  padding-left: 16px;
  font-family: PingFangSC, sans-serif;
  color: ${DEFAULT_FONT_COLOR};
  font-size: ${DEFAULT_FONT_SIZE};
  margin-bottom: 4px;

  ul,
  ol {
    list-style-position: inside;
  }
`;

export const Li = styled.li`
  list-style: inherit;
  line-height: 1.74;

  ::marker {
    margin-right: -8px;
  }
`;
