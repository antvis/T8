import React from 'react';
import { usePlateEditorRef, insertNodes, getPluginType } from '@udecode/plate-core';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ToolbarButton, ToolbarButtonProps } from '@udecode/plate-ui-toolbar';

interface CustomBlockToolbarButtonProps extends ToolbarButtonProps {
  type: string;
}

export const CustomBlockToolbarButton = ({ id, type, ...props }: CustomBlockToolbarButtonProps) => {
  const editor = usePlateEditorRef(id);

  const handleInsertBlockElement = (event) => {
    if (!editor) return;
    event.preventDefault();
    insertNodes(editor, {
      type: getPluginType(editor, type),
      children: [{ text: '' }],
    });
    // Auto add an empty line
    insertNodes(editor, {
      type: getPluginType(editor, ELEMENT_PARAGRAPH),
      children: [{ text: '' }],
    });
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
