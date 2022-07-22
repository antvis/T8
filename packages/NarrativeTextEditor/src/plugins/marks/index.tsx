/**
 * <strong /> <em /> and <u />
 */
import React from 'react';
import {
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { usePlateEditorRef, getPluginType } from '@udecode/plate-core';
import { MarkToolbarButton } from '@udecode/plate-ui-toolbar';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined } from '@ant-design/icons';
import { NStyledComponents } from '@antv/narrative-text-vis';
import { useLocale } from '../../components/ConfigProvider/hooks';

export const basicMarkPlugins = [createBoldPlugin(), createItalicPlugin(), createUnderlinePlugin()];

export const BasicMarkToolbarButtons = () => {
  const editor = usePlateEditorRef();
  const locale = useLocale();

  return (
    <>
      <MarkToolbarButton type={getPluginType(editor, MARK_BOLD)} icon={<BoldOutlined />} tooltip={{ content: locale['bold'] }}/>
      <MarkToolbarButton type={getPluginType(editor, MARK_ITALIC)} icon={<ItalicOutlined />} tooltip={{ content: locale['italic'] }}/>
      <MarkToolbarButton type={getPluginType(editor, MARK_UNDERLINE)} icon={<UnderlineOutlined />} tooltip={{ content: locale['underline'] }}/>
    </>
  );
};

export const basicMarkComponents = {
  [MARK_BOLD]: NStyledComponents.Bold,
  [MARK_ITALIC]: NStyledComponents.Italic,
  [MARK_UNDERLINE]: NStyledComponents.Underline,
};
