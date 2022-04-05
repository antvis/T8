import React from 'react';
import {
  createListPlugin,
  usePlateEditorRef,
  ListToolbarButton,
  getPluginType,
  ELEMENT_UL,
  ELEMENT_OL,
} from '@udecode/plate';
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
