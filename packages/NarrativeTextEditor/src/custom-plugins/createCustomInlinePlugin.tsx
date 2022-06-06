import React from 'react';
import { createPluginFactory, useEditorRef, findNodePath, setNodes } from '@udecode/plate-core';
import { StyledElementProps, getRootProps } from '@udecode/plate-styled-components';

interface CustomInlineComponentProps {
  onChange: (value: any) => void;
  element: StyledElementProps['element'];
}

type CustomInlineComponent = React.FC<CustomInlineComponentProps>;

const customInlineElementWrapper = (Component: CustomInlineComponent) => (props: StyledElementProps) => {
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

export const createCustomInlinePlugin = (key: string, component: CustomInlineComponent) =>
  createPluginFactory({
    key,
    isElement: true,
    isInline: true,
    isVoid: true,
  })({
    component: customInlineElementWrapper(component),
  });
