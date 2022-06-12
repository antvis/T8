import React, { useCallback } from 'react';
import { useEditorState } from '@udecode/plate-core';
import { PortalBody } from '@udecode/plate-styled-components';
import { usePopperPosition, getRangeBoundingClientRect, virtualReference } from '@udecode/plate-ui-popper';
import { useCommandPanelSelectors } from './commandPanel.store';

export const CommandPanel = () => {
  const editor = useEditorState();
  const popperRef = React.useRef<HTMLDivElement>(null);
  const targetRange = useCommandPanelSelectors.targetRange();
  const getBoundingClientRect = useCallback(() => {
    console.log('targetRange: ', getRangeBoundingClientRect(editor, targetRange));
    return getRangeBoundingClientRect(editor, targetRange) ?? virtualReference;
  }, [editor, targetRange]);
  const { styles: popperStyles } = usePopperPosition({
    popperElement: popperRef.current,
    placement: 'bottom-start',
    getBoundingClientRect,
    offset: [0, 4],
  });
  return (
    <PortalBody>
      <div ref={popperRef} style={popperStyles.popper}>
        lorem
      </div>
    </PortalBody>
  );
};
