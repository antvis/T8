/**
 * <ul/> and <ol/>
 */
import React from 'react';
import { usePlateEditorRef, getPluginType, withProps } from '@udecode/plate-core';
import { StyledElement } from '@udecode/plate-styled-components';
import { createListPlugin, ELEMENT_UL, ELEMENT_OL, ELEMENT_LI } from '@udecode/plate-list';
import { OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useLocale } from '../../components/ConfigProvider/hooks';
import { ListToolbarButton } from '../../components/ListToolbarButton';

export const listPlugin = createListPlugin();

export const ListToolbarButtons = () => {
  const editor = usePlateEditorRef();
  const locale = useLocale();
  return (
    <>
      <ListToolbarButton
        type={getPluginType(editor, ELEMENT_UL)}
        icon={<UnorderedListOutlined />}
        tooltip={{ content: locale.unorderedList }}
      />
      <ListToolbarButton
        type={getPluginType(editor, ELEMENT_OL)}
        icon={<OrderedListOutlined />}
        tooltip={{ content: locale.orderedList }}
      />
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
  [ELEMENT_LI]: withProps(StyledElement, {
    as: 'li',
    styles: {
      root: `
        font-size: 14px;
    `,
    },
  }),
};
