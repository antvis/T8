import React from 'react';
import { AnyObject } from '@antv/narrative-text-vis';
import {
  withPlateEventProvider,
  usePlateEditorState,
  insertNodes,
  removeNodes,
  getPluginType,
} from '@udecode/plate-core';
import { ToolbarButton, ToolbarButtonProps } from '@udecode/plate-ui-toolbar';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { isBeginningOfLine } from '../core';

interface CustomBlockToolbarButtonProps extends ToolbarButtonProps {
  type: string;
  beforeInsert?: () => Promise<AnyObject>;
}

export const CustomBlockToolbarButton = withPlateEventProvider(
  ({ type, beforeInsert, ...props }: CustomBlockToolbarButtonProps) => {
    const editor = usePlateEditorState();

    const handleInsertBlockElement = async (event) => {
      if (!editor) return;
      event.preventDefault();
      try {
        const initialData = beforeInsert ? await beforeInsert() : {};

        if (isBeginningOfLine(editor)) removeNodes(editor);
        insertNodes(editor, {
          type: getPluginType(editor, type),
          ...initialData,
          children: [{ text: '' }],
        });
        insertNodes(editor, {
          type: getPluginType(editor, ELEMENT_PARAGRAPH),
          children: [{ text: '' }],
        });
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <ToolbarButton
        styles={{
          root: {
            minWidth: 28,
            width: 'auto',
          },
        }}
        onMouseDown={handleInsertBlockElement}
        {...props}
      />
    );
  },
);
