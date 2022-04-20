import React from 'react';
import { BalloonToolbar } from '@udecode/plate-ui-toolbar';
import { Space } from 'antd';
import {
  ParagraphToolbarButton,
  AlignToolbarButtons,
  ListToolbarButtons,
  BasicMarkToolbarButtons,
  FontToolbarButtons,
} from '../plugins';

const HoveringToolbar = () => (
  <BalloonToolbar
    popperOptions={{
      placement: 'top',
    }}
    theme="dark"
    arrow={false}
  >
    <Space>
      <ParagraphToolbarButton />
      <BasicMarkToolbarButtons />
      <AlignToolbarButtons />
      <ListToolbarButtons />
      <FontToolbarButtons />
    </Space>
  </BalloonToolbar>
);

export default HoveringToolbar;
