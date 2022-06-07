import React from 'react';
import { usePlateEditorRef, insertNodes, getPluginType, someNode } from '@udecode/plate-core';
import { ToolbarButton, ToolbarButtonProps } from '@udecode/plate-ui-toolbar';

interface CustomInlineToolbarButtonProps extends ToolbarButtonProps {
  type: string;
}

export const CustomInlineToolbarButton = ({ id, type: typeKey, ...props }: CustomInlineToolbarButtonProps) => {
  const editor = usePlateEditorRef(id);

  const type = getPluginType(editor, typeKey);
  const isActive = !!editor?.selection && someNode(editor, { match: { type } });

  const handleInsertInlineElement = (event) => {
    if (!editor) return;
    event.preventDefault();
    insertNodes(editor, { text: '' });
    insertNodes(editor, {
      type,
      children: [{ text: '' }],
    });
    insertNodes(editor, { text: '' });
  };

  return <ToolbarButton active={isActive} onMouseDown={handleInsertInlineElement} {...props} />;
};
