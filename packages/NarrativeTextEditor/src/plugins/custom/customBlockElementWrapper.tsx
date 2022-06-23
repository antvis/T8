import React from 'react';
import { findNodePath, useEditorRef, setNodes } from '@udecode/plate-core';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';
import { useFocused, useSelected } from 'slate-react';
import { CustomElementComponent } from './custom.type';

export const customBlockElementWrapper = (Component: CustomElementComponent) => (props: StyledElementProps) => {
  const { attributes, children, className, element } = props;
  const rootProps = getRootProps(props);
  const editor = useEditorRef();
  const selected = useSelected();
  const focused = useFocused();
  const onChange = (value: any) => {
    const path = findNodePath(editor, element);
    setNodes(editor, value, { at: path });
  };
  return (
    <div {...attributes} {...rootProps} className={className}>
      <div contentEditable={false}>
        <Component selected={selected} focused={focused} element={element} onChange={onChange} />
      </div>
      {children}
    </div>
  );
};
