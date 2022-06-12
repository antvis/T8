import React from 'react';
import { useEditorRef, findNodePath, setNodes } from '@udecode/plate-core';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';
import { CustomElementComponent } from './custom.type';

export const customInlineElementWrapper = (Component: CustomElementComponent) => (props: StyledElementProps) => {
  const { attributes, children, nodeProps, element, className } = props;
  const rootProps = getRootProps(props);
  const editor = useEditorRef();
  const onChange = (value: any) => {
    const path = findNodePath(editor, element);
    setNodes(editor, value, { at: path });
  };
  return (
    <span
      {...attributes}
      data-slate-value={element.value}
      className={className}
      contentEditable={false}
      // Default wrapping
      style={{ whiteSpace: 'normal' }}
      {...rootProps}
      {...nodeProps}
    >
      <Component element={element} onChange={onChange} />
      {children}
    </span>
  );
};
