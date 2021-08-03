import React, { useRef, CSSProperties } from 'react';
import { Transforms } from 'slate';
import { RenderLeafProps, ReactEditor, useSlate } from 'slate-react';
import { InlineVariable } from './InlineVariable';

type RenderLeaf = (props: RenderLeafProps) => JSX.Element;

export const Leaf: RenderLeaf = (props) => {
  const { attributes, leaf } = props;
  let { children } = props;
  const editor = useSlate();

  const domNode = useRef<HTMLElement>();
  const removeNode = () => {
    const slateNode = ReactEditor.toSlateNode(editor, domNode.current);
    const path = ReactEditor.findPath(editor, slateNode);
    if (path) {
      Transforms.removeNodes(editor, {
        at: path,
      });
    }
  };

  if ('bold' in leaf && leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if ('italic' in leaf && leaf.italic) {
    children = <em>{children}</em>;
  }

  if ('underline' in leaf && leaf.underline) {
    children = <u>{children}</u>;
  }

  if ('isVariable' in leaf) {
    leaf.text = `<${leaf.text}>`;
    children = (
      <InlineVariable {...props} removeNode={removeNode}>
        {children}
      </InlineVariable>
    );
  }

  let style: CSSProperties = {};
  if ('color' in leaf) {
    style = {
      color: leaf.color,
      backgroundColor: leaf.backgroundColor,
    };
  }

  return (
    <span {...attributes} style={style} ref={domNode}>
      {children}
    </span>
  );
};
