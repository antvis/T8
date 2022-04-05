/**
 * Includes the following plugins:
 *
 * createBoldPlugin() for the bold mark
 * createItalicPlugin() for the italic mark
 * createUnderlinePlugin() for the underline mark
 * createStrikethroughPlugin() for the strikethrough mark
 * createSubscriptPlugin() for the subscript mark
 * createSuperscriptPlugin() for the superscript mark
 * createCodePlugin() for the code mark
 */
import React from 'react';
import {
  createBasicMarksPlugin,
  MarkToolbarButton,
  usePlateEditorRef,
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
} from '@udecode/plate';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';

export const basicMarksPlugin = createBasicMarksPlugin();

export const BasicMarkToolbarButtons = () => {
  const editor = usePlateEditorRef();

  return (
    <>
      <MarkToolbarButton type={getPluginType(editor, MARK_BOLD)} icon={<BoldOutlined />} />
      <MarkToolbarButton type={getPluginType(editor, MARK_ITALIC)} icon={<ItalicOutlined />} />
      <MarkToolbarButton type={getPluginType(editor, MARK_UNDERLINE)} icon={<UnderlineOutlined />} />
      <MarkToolbarButton type={getPluginType(editor, MARK_STRIKETHROUGH)} icon={<StrikethroughOutlined />} />
    </>
  );
};
