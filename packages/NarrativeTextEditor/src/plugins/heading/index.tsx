/**
 * <h1/> ~ <h6/>
 */
import React from 'react';
import { usePlateEditorRef, getPluginType } from '@udecode/plate-core';
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading';
import { BlockToolbarButton } from '@udecode/plate-ui-toolbar';
import { NStyledComponents } from '@antv/narrative-text-vis';

export const headingPlugin = createHeadingPlugin();

export const HeadingToolbarButtons = () => {
  const editor = usePlateEditorRef();
  return (
    <>
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H1)} icon="h1" />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H2)} icon="h2" />
      <BlockToolbarButton type={getPluginType(editor, ELEMENT_H3)} icon="h3" />
    </>
  );
};

export const headingComponents = {
  [ELEMENT_H1]: NStyledComponents.H1,
  [ELEMENT_H2]: NStyledComponents.H2,
  [ELEMENT_H3]: NStyledComponents.H3,
  [ELEMENT_H4]: NStyledComponents.H4,
  [ELEMENT_H5]: NStyledComponents.H5,
  [ELEMENT_H6]: NStyledComponents.H6,
};
