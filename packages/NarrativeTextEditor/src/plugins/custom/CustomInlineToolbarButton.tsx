import React from 'react';
import { withPlateEventProvider, usePlateEditorState, insertNodes, getPluginType, someNode } from '@udecode/plate-core';
import { ToolbarButton, ToolbarButtonProps } from '@udecode/plate-ui-toolbar';

interface CustomInlineToolbarButtonProps extends ToolbarButtonProps {
  type: string;
}

export const CustomInlineToolbarButton = withPlateEventProvider(
  ({ type: typeKey, ...props }: CustomInlineToolbarButtonProps) => {
    const editor = usePlateEditorState();

    const type = getPluginType(editor, typeKey);
    const isActive = !!editor?.selection && someNode(editor, { match: { type } });

    const handleInsertInlineElement = (event) => {
      if (!editor) return;
      event.preventDefault();
      insertNodes(editor, {
        type,
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
        active={isActive}
        onMouseDown={handleInsertInlineElement}
        {...props}
      />
    );
  },
);
