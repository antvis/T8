/**
 * The alignment plugin enables support for text alignment.
 * You can use it to align your content to left, right, center or to justify it.
 */
import React from 'react';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { AlignToolbarButton } from '@udecode/plate-ui-alignment';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, ColumnWidthOutlined } from '@ant-design/icons';

const NORMAL_VALID_TYPES = [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6];

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
