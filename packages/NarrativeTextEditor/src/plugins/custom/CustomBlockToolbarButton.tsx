import React from 'react';
import { AnyObject } from '@antv/narrative-text-vis';
import { usePlateEditorRef, insertNodes, getPluginType } from '@udecode/plate-core';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ToolbarButton, ToolbarButtonProps } from '@udecode/plate-ui-toolbar';

interface CustomBlockToolbarButtonProps extends ToolbarButtonProps {
  type: string;
  beforeInsert?: () => Promise<AnyObject>;
}

export const CustomBlockToolbarButton = ({ id, type, beforeInsert, ...props }: CustomBlockToolbarButtonProps) => {
  const editor = usePlateEditorRef(id);

  const handleInsertBlockElement = async (event) => {
    if (!editor) return;
    event.preventDefault();
    try {
      const initialData = beforeInsert ? await beforeInsert() : {};
      insertNodes(editor, {
        type: getPluginType(editor, type),
        ...initialData,
        children: [{ text: '' }],
      });
      // Auto add an empty line
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
};
