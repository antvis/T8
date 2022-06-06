import React from 'react';
import { findNodePath, useEditorRef, setNodes, createPluginFactory } from '@udecode/plate-core';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';

interface CustomBlockComponentProps {
  onChange: (value: any) => void;
  element: StyledElementProps['element'];
}

type CustomBlockComponent = React.FC<CustomBlockComponentProps>;

const customElementWrapper = (Component: CustomBlockComponent) => (props: StyledElementProps) => {
  const { attributes, children, className, element } = props;
  const rootProps = getRootProps(props);
  const editor = useEditorRef();
  const onChange = (value: any) => {
    const path = findNodePath(editor, element);
    setNodes(editor, value, { at: path });
  };
  return (
    <div {...attributes} {...rootProps} className={className}>
      <div contentEditable={false}>
        <Component element={element} onChange={onChange} />
      </div>
      {children}
    </div>
  );
};

export const createCustomBlockPlugin = (key: string, component: CustomBlockComponent) =>
  createPluginFactory({
    key,
    isElement: true,
    isVoid: true,
  })({
    component: customElementWrapper(component),
  });
