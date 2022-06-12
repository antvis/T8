import React, { useState } from 'react';
import {
  Value,
  findNodePath,
  useEditorRef,
  setNodes,
  insertText,
  unwrapNodes,
  getPluginType,
} from '@udecode/plate-core';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';
import { TLinkElement, ELEMENT_LINK } from '@udecode/plate-link';
import { PopToolbar } from '../../components/PopToolbar';
import { LinkPopEditOverlay, LinkFormValue } from './LinkPopEditOverlay';
import { getLinkElementStyles } from './LinkElement.styles';

export const LinkElement = <V extends Value>(props: StyledElementProps<V, TLinkElement>) => {
  const { attributes, children, nodeProps, element } = props;
  const [visible, setVisible] = useState(!element.url);
  const editor = useEditorRef();

  const rootProps = getRootProps(props);
  const { root } = getLinkElementStyles(props);

  const onChange = (values: LinkFormValue) => {
    const path = findNodePath(editor, element);
    setNodes(editor, { url: values?.url }, { at: path });
    insertText(editor, values?.text, { at: path });
    setVisible(false);
  };

  const unlink = () => {
    const path = findNodePath(editor, element);
    unwrapNodes(editor, {
      at: path,
      match: {
        type: getPluginType(editor, ELEMENT_LINK),
      },
      split: true,
    });
  };

  return (
    <PopToolbar
      visible={visible}
      onVisibleChange={setVisible}
      overlay={<LinkPopEditOverlay visible={visible} element={element} onChange={onChange} unlink={unlink} />}
    >
      <a
        target="_blank"
        rel="noreferrer"
        {...attributes}
        href={element.url}
        className={root.className}
        {...rootProps}
        {...nodeProps}
      >
        {children}
      </a>
    </PopToolbar>
  );
};
