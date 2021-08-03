import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Space, Divider } from 'antd';
import { Range, Editor } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { FormatButton, StyleButton } from './HoveringButton';
import { getPrefixCls } from '../utils/getPrefixCls';

const Portal = ({ children }) => (typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null);

export const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <div ref={ref} className={getPrefixCls('hovering-tooltip')}>
        <Space>
          <FormatButton format="bold" />
          <FormatButton format="italic" />
          <FormatButton format="underline" />
          <Divider type="vertical" />
          <StyleButton type="font" color="red" />
          <StyleButton type="font" color="green" />
          <StyleButton type="background" color="red" />
          <StyleButton type="background" color="green" />
        </Space>
      </div>
    </Portal>
  );
};
