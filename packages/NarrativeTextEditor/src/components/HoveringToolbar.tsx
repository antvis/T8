import React from 'react';
import { BalloonToolbar } from '@udecode/plate-ui-toolbar';
import { BasicMarkToolbarButtons } from '../plugins';

const HoveringToolbar = () => (
  <BalloonToolbar
    popperOptions={{
      placement: 'top',
    }}
    theme="dark"
    arrow={false}
  >
    <BasicMarkToolbarButtons />
  </BalloonToolbar>
);

export default HoveringToolbar;
