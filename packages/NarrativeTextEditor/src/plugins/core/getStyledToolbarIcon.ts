import { css } from 'styled-components';

export const getStyledToolbarIcon = () => ({
  root: css`
    > svg {
      width: 1.25em;
      height: 1.25em;
    }
  `,
});
