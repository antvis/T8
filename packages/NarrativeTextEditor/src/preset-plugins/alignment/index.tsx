/**
 * The alignment plugin enables support for text alignment.
 * You can use it to align your content to left, right, center or to justify it.
 */
import React from 'react';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { AlignToolbarButton } from '@udecode/plate-ui-alignment';

import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, ColumnWidthOutlined } from '@ant-design/icons';

import { NORMAL_VALID_TYPES } from '../common';

/** alignment plugin */
export const alignPlugin = createAlignPlugin({
  inject: {
    props: {
      validTypes: NORMAL_VALID_TYPES,
    },
  },
});

export const AlignToolbarButtons = () => (
  <>
    <AlignToolbarButton value="left" icon={<AlignLeftOutlined />} />
    <AlignToolbarButton value="center" icon={<AlignCenterOutlined />} />
    <AlignToolbarButton value="right" icon={<AlignRightOutlined />} />
    <AlignToolbarButton value="justify" icon={<ColumnWidthOutlined />} />
  </>
);
