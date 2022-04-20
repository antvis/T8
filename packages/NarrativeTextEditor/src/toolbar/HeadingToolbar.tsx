import React from 'react';
import { HeadingToolbar as PlateHeadingToolbar } from '@udecode/plate-ui-toolbar';

import {
  HeadingToolbarButtons,
  ParagraphToolbarButton,
  AlignToolbarButtons,
  ListToolbarButtons,
  BasicMarkToolbarButtons,
  FontToolbarButtons,
} from '../plugins';

const HeadingToolbar = () => (
  <PlateHeadingToolbar>
    <HeadingToolbarButtons />
    <ParagraphToolbarButton />
    <BasicMarkToolbarButtons />
    {/* <FontToolbarButtons /> */}
    <AlignToolbarButtons />
    <ListToolbarButtons />
  </PlateHeadingToolbar>
);

export default HeadingToolbar;
