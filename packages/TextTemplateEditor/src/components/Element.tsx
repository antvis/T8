/** 统一包裹处理块级元素 */
import React, { CSSProperties } from 'react';
import type { RenderElementProps } from 'slate-react';
import { getPrefixCls } from '../utils/getPrefixCls';

type RenderElement = (props: RenderElementProps) => JSX.Element;

export const Element: RenderElement = ({ attributes, children, element }) => {
  let style: CSSProperties = {};
  if ('color' in element) {
    style = {
      color: element.color,
      backgroundColor: element.backgroundColor,
      textAlign: element.align,
      fontSize: element.fontSize,
    };
  }

  let Main = (
    <p className={getPrefixCls('p')} style={style}>
      {children}
    </p>
  );
  switch (element.type) {
    case 'heading-two':
      Main = <h2 style={style}>{children}</h2>;
      break;
    case 'heading-three':
      Main = <h3 style={style}>{children}</h3>;
      break;
    default:
      break;
  }

  return (
    <div className={getPrefixCls('block-container')} {...attributes}>
      {Main}
    </div>
  );
};
