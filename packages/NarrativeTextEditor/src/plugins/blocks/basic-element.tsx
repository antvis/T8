/**
 * Includes the following plugins:
 *
 * createBlockquotePlugin() for the blockquote element
 * createCodeBlockPlugin() for the code_block element
 * createHeadingPlugin() for the h1, h2,... elements
 * createParagraphPlugin() for the p element
 */
import React from 'react';
import {
  createBasicElementsPlugin,
  BlockToolbarButton,
  usePlateEditorRef,
  getPluginType,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  ELEMENT_BLOCKQUOTE,
} from '@udecode/plate';

export const basicElementsPlugin = createBasicElementsPlugin();

export const BasicElementToolbarButtons = () => {
  const editor = usePlateEditorRef();

  return (
    <>
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H1)} icon="h1" />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H2)} icon="h2" />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H3)} icon="h3" />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_PARAGRAPH)} icon="p" />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_BLOCKQUOTE)} icon='"' />
    </>
  );
};
