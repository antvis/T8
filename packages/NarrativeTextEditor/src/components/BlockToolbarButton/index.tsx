import React from 'react';
import {
  someNode,
  toggleNodeType,
  getPreventDefaultHandler,
  withPlateEventProvider,
  useEventPlateId,
  usePlateEditorState,
} from '@udecode/plate-core';
import { BlockToolbarButton as PlateBlockToolbarButton, BlockToolbarButtonProps } from '@udecode/plate-ui-toolbar';
import { isBuildInBlockType } from '../../helpers';

// Overwrite Plate BlockToolbarButton to prevent custom block element toggle
export const BlockToolbarButton = withPlateEventProvider(
  ({ id, type: activeType, inactiveType, active, ...props }: BlockToolbarButtonProps) => {
    // eslint-disable-next-line no-param-reassign
    id = useEventPlateId(id);
    const editor = usePlateEditorState(id);
    return (
      <PlateBlockToolbarButton
        type={activeType}
        active={active ?? (!!editor?.selection && someNode(editor, { match: { type: activeType } }))}
        onMouseDown={
          editor &&
          isBuildInBlockType(editor) &&
          getPreventDefaultHandler(toggleNodeType, editor, {
            activeType,
            inactiveType,
          })
        }
        {...props}
      />
    );
  },
);
