import React from 'react';
import { HeadingToolbar as PlateHeadingToolbar } from '@udecode/plate-ui-toolbar';

import {
  HeadingToolbarButtons,
  ParagraphToolbarButton,
  AlignToolbarButtons,
  ListToolbarButtons,
  LinkToolBarButton,
  BasicMarkToolbarButtons,
  FontToolbarButtons,
} from '../plugins';

const HeadingToolbar = () => (
  <PlateHeadingToolbar>
    <HeadingToolbarButtons />
    <ParagraphToolbarButton />
    <FontToolbarButtons />
    <BasicMarkToolbarButtons />
    <AlignToolbarButtons />
    <ListToolbarButtons />
    <LinkToolBarButton />
  </PlateHeadingToolbar>
);

export default HeadingToolbar;
