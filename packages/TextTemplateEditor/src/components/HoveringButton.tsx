import React from 'react';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, FontColorsOutlined } from '@ant-design/icons';
import { Editor, Transforms, Text } from 'slate';
import { useSlate } from 'slate-react';

type InlineFormatType = 'bold' | 'italic' | 'underline';

const IconMap: Record<InlineFormatType, typeof BoldOutlined> = {
  bold: BoldOutlined,
  italic: ItalicOutlined,
  underline: UnderlineOutlined,
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const FormatButton: React.FC<{ format: InlineFormatType }> = ({ format }) => {
  const editor = useSlate();
  const Comp = IconMap[format];

  return (
    <Comp
      style={{
        color: isMarkActive(editor, format) ? '#fff' : '#aaa',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    />
  );
};

export const StyleButton: React.FC<{
  type: 'font' | 'background';
  color: string;
}> = ({ type, color }) => {
  const editor = useSlate();
  const changeColor = (newColor: string) => {
    Transforms.setNodes(
      editor,
      {
        color: type === 'font' ? newColor : 'unset',
        backgroundColor: type !== 'font' ? newColor : 'unset',
      },
      { match: Text.isText, split: true },
    );
  };
  return (
    <FontColorsOutlined
      style={{
        color: type === 'font' ? color : '#fff',
        backgroundColor: type === 'background' ? color : 'unset',
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        changeColor(color);
      }}
    />
  );
};
