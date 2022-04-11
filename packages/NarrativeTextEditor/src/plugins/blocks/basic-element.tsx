/**
 * Includes the following plugins:
 *
 * createBlockquotePlugin() for the blockquote element
 * createHeadingPlugin() for the h1, h2,... elements
 * createParagraphPlugin() for the p element
 */
import React from 'react';
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { BlockToolbarButton } from '@udecode/plate-ui';
import { usePlateEditorRef, getPluginType } from '@udecode/plate-core';

export const basicElementsPlugins = [createBlockquotePlugin(), createHeadingPlugin(), createParagraphPlugin()];

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
