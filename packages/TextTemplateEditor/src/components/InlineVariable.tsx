import React from 'react';
import type { RenderLeafProps } from 'slate-react';
import { CloseOutlined } from '@ant-design/icons';
import { getPrefixCls } from '../utils/getPrefixCls';

interface Props extends RenderLeafProps {
  removeNode: () => void;
}
export const InlineVariable: React.FC<Props> = ({ children, leaf, removeNode }) => {
  if ('isVariable' in leaf && leaf.isVariable) {
    const { type } = leaf;
    return (
      <span
        // 之所以没有用 isVoid 是因为其针对 block 元素的
        contentEditable={false}
        className={`${getPrefixCls('variable')} ${getPrefixCls(`variable-${type}`)}`}
      >
        {children}
        <CloseOutlined onClick={removeNode} />
      </span>
    );
  }
  return null;
};
