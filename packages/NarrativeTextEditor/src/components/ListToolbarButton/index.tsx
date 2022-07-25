import React from 'react';
import {
  someNode,
  getPreventDefaultHandler,
  withPlateEventProvider,
  useEventPlateId,
  usePlateEditorState,
} from '@udecode/plate-core';
import { toggleList } from '@udecode/plate-list';
import { ListToolbarButton as PlateListToolbarButton } from '@udecode/plate-ui-list';
import { ToolbarButtonProps } from '@udecode/plate-ui-toolbar';
import { isBuildInBlockType } from '../../helpers';

// Overwrite Plate ListToolbarButton to prevent custom block element toggle
export const ListToolbarButton = withPlateEventProvider(
  ({ id, type: activeType, active, ...props }: ToolbarButtonProps & { type?: string }) => {
    // eslint-disable-next-line no-param-reassign
    id = useEventPlateId(id);
    const editor = usePlateEditorState(id);
    return (
      <PlateListToolbarButton
        type={activeType}
        active={active ?? (!!editor?.selection && someNode(editor, { match: { type: activeType } }))}
        onMouseDown={
          editor &&
          isBuildInBlockType(editor) &&
          getPreventDefaultHandler(toggleList, editor, {
            type: activeType,
          })
        }
        {...props}
      />
    );
  },
);
