import React from 'react';
import { createListPlugin, ELEMENT_UL, ELEMENT_OL } from '@udecode/plate-list';
import { usePlateEditorRef, getPluginType } from '@udecode/plate-core';
import { ListToolbarButton } from '@udecode/plate-ui';
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
