import React from 'react';
import { BalloonToolbar } from '@udecode/plate-ui-toolbar';
import {
  BasicMarkToolbarButtons,
  // TODO 暂时不在 hovering tooltip 中透出，因为点击会消失
  // FontToolbarButtons,
} from '../preset-plugins';

const HoveringToolbar = () => (
  <BalloonToolbar popperOptions={{ placement: 'top' }} arrow={false}>
    <BasicMarkToolbarButtons />
  </BalloonToolbar>
);

export default HoveringToolbar;
