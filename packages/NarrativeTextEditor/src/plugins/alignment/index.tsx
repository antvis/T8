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
import { useLocale } from '../../components/ConfigProvider/hooks';

const NORMAL_VALID_TYPES = [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6];

/** alignment plugin */
export const alignPlugin = createAlignPlugin({
  inject: {
    props: {
      validTypes: NORMAL_VALID_TYPES,
    },
  },
});

export const AlignToolbarButtons = () => {
  const locale = useLocale();
  return (
    <>
      <AlignToolbarButton value="left" icon={<AlignLeftOutlined />} tooltip={{ content: locale['alignLeft'] }}/>
      <AlignToolbarButton value="center" icon={<AlignCenterOutlined />} tooltip={{ content: locale['alignCenter'] }}/>
      <AlignToolbarButton value="right" icon={<AlignRightOutlined />} tooltip={{ content: locale['alignRight'] }}/>
      <AlignToolbarButton value="justify" icon={<ColumnWidthOutlined />} tooltip={{ content: locale['alignColumnWidth'] }}/>
    </>
  );
};