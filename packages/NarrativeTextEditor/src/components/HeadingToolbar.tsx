import React from 'react';
import { HeadingToolbar as PlateHeadingToolbar } from '@udecode/plate-ui-toolbar';

import {
  BasicElementToolbarButtons,
  AlignToolbarButtons,
  ListToolbarButtons,
  LinkToolBarButton,
  BasicMarkToolbarButtons,
  FontToolbarButtons,
} from '../plugins';

const HeadingToolbar = () => (
  <PlateHeadingToolbar>
    <BasicElementToolbarButtons />
    <FontToolbarButtons />
    <BasicMarkToolbarButtons />
    <AlignToolbarButtons />
    <ListToolbarButtons />
    <LinkToolBarButton />
  </PlateHeadingToolbar>
);

export default HeadingToolbar;
