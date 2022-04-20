import React from 'react';
import { BalloonToolbar } from '@udecode/plate-ui-toolbar';
import {
  HeadingToolbarButtons,
  ParagraphToolbarButton,
  AlignToolbarButtons,
  ListToolbarButtons,
  BasicMarkToolbarButtons,
  // TODO 暂时不在 hovering tooltip 中透出，因为点击会消失
  // FontToolbarButtons,
} from '../plugins';

const HoveringToolbar = () => (
  <BalloonToolbar popperOptions={{ placement: 'top' }} arrow={false}>
    <HeadingToolbarButtons />
    <ParagraphToolbarButton />
    <BasicMarkToolbarButtons />
    <AlignToolbarButtons />
    <ListToolbarButtons />
    {/* <FontToolbarButtons /> */}
  </BalloonToolbar>
);

export default HoveringToolbar;
