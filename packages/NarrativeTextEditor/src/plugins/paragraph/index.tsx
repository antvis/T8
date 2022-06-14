/**
 * <p/>
 */
import React from 'react';
import { usePlateEditorRef, getPluginType, withProps } from '@udecode/plate-core';
import { StyledElement } from '@udecode/plate-styled-components';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { BlockToolbarButton } from '@udecode/plate-ui-toolbar';
import { TextParagraph } from '@styled-icons/bootstrap/TextParagraph';

export const paragraphPlugin = createParagraphPlugin();

export const ParagraphToolbarButton = () => {
  const editor = usePlateEditorRef();
  return <BlockToolbarButton type={getPluginType(editor, ELEMENT_PARAGRAPH)} icon={<TextParagraph />} />;
};

// TODO 用 ntv 的 styled 组件替换，当前直接使用组件会没有 placeholder
export const paragraphComponent = {
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    as: 'p',
    styles: {
      root: `
        color: #262626;
        font-size: 14px;
        min-height: 24px;
        line-height: 24px;
        margin-bottom: 4px;
      `,
    },
  }),
};
