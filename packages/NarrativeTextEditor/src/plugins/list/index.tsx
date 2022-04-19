/**
 * <ul/> and <ol/>
 */
import React from 'react';
import { usePlateEditorRef, getPluginType, withProps } from '@udecode/plate-core';
import { StyledElement } from '@udecode/plate-styled-components';
import { createListPlugin, ELEMENT_UL, ELEMENT_OL, ELEMENT_LI } from '@udecode/plate-list';
import { ListToolbarButton } from '@udecode/plate-ui-list';
import { OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons';

export const listPlugin = createListPlugin();

export const ListToolbarButtons = () => {
  const editor = usePlateEditorRef();
  return (
    <>
      <ListToolbarButton type={getPluginType(editor, ELEMENT_UL)} icon={<UnorderedListOutlined />} />
      <ListToolbarButton type={getPluginType(editor, ELEMENT_OL)} icon={<OrderedListOutlined />} />
    </>
  );
};

export const listComponents = {
  // TODO 使用 ntv 导出的样式组件
  [ELEMENT_UL]: withProps(StyledElement, {
    as: 'ul',
    styles: {
      root: `
        padding-left: 16px;
        margin-bottom: 4px;
      `,
    },
  }),
  [ELEMENT_OL]: withProps(StyledElement, {
    as: 'ol',
    styles: {
      root: `
        padding-left: 16px;
        margin-bottom: 4px;
      `,
    },
  }),
  [ELEMENT_LI]: withProps(StyledElement, { as: 'li' }),
};
