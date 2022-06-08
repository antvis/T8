import React from 'react';
import { LinkOutlined } from '@ant-design/icons';
import {
  withPlateEventProvider,
  usePlateEditorState,
  isVoid,
  someNode,
  insertNodes,
  getAboveNode,
  isCollapsed,
  getPluginType,
  select,
  unwrapNodes,
  collapseSelection,
  getLeafNode,
  PlateEditor,
  Value,
} from '@udecode/plate-core';
import { createLinkPlugin, ELEMENT_LINK, TLinkElement, wrapLink } from '@udecode/plate-link';
import { LinkToolbarButton as PlateLinkToolbarButton } from '@udecode/plate-ui-link';
import { LinkElement } from './LinkElement';

export const linkPlugin = createLinkPlugin({
  component: LinkElement,
});

function insertEmptyLink(editor: PlateEditor<Value>) {
  insertNodes<TLinkElement>(editor, {
    type: getPluginType(editor, ELEMENT_LINK),
    url: '',
    children: [{ text: '链接' }],
  });
}

export const LinkToolbarButton = withPlateEventProvider(() => {
  const editor = usePlateEditorState();
  const type = getPluginType(editor, ELEMENT_LINK);

  const handleInsertLink = (event) => {
    if (!editor) return;
    event.preventDefault();

    if (editor.selection) {
      const disabled = someNode(editor, {
        match: (n) => isVoid(editor, n),
      });
      if (disabled) return;

      const linkNode = getAboveNode(editor, {
        match: { type },
      });
      const shouldWrap: boolean = linkNode !== undefined && isCollapsed(editor.selection);
      let prevUrl = '';
      if (linkNode) prevUrl = linkNode[0].url as string;

      if (isCollapsed(editor.selection)) {
        // if our cursor is inside an existing link, but don't have the text selected, select it now
        if (shouldWrap) {
          const linkLeaf = getLeafNode(editor, editor.selection);
          const [, inlinePath] = linkLeaf;
          select(editor, inlinePath);
        } else {
          insertEmptyLink(editor);
          return;
        }
      }
      unwrapNodes(editor, { at: editor.selection, match: { type } });
      wrapLink(editor, { at: editor.selection, url: prevUrl });
      collapseSelection(editor, { edge: 'end' });
    } else {
      insertEmptyLink(editor);
    }
  };
  return <PlateLinkToolbarButton icon={<LinkOutlined />} onMouseDown={handleInsertLink} />;
});
