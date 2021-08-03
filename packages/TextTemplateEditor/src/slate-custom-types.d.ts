import { Descendant, BaseEditor, Text } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

type TextAlign = 'left' | 'center' | 'right';

type BaseBlockStyle = {
  align?: TextAlign;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
};

/** Heading */
export type HeadingElement = BaseBlockStyle & {
  type: 'heading';
  children: Text[];
};

export type HeadingTwoElement = BaseBlockStyle & {
  type: 'heading-two';
  children: Text[];
};

export type HeadingThreeElement = BaseBlockStyle & {
  type: 'heading-three';
  children: Text[];
};

/** Paragraph */
export type ParagraphElement = BaseBlockStyle & {
  type: 'paragraph';
  children: Text[];
};

/** List */
export type BulletedListElement = BaseBlockStyle & {
  type: 'bulleted-list' | 'numbered-list';
  children: ListItemElement[];
};

export type ListItemElement = {
  type: 'list-item';
  // TODO 嵌套层级
  children: Text[];
};

type CustomElement =
  | BulletedListElement
  | ListItemElement
  | HeadingElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ParagraphElement;

type BaseInlineStyle = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  backgroundColor?: string;
};

export type CustomText = BaseInlineStyle & {
  text: string;
};

export type EmptyText = {
  text: string;
};

export type InlineVariableText = BaseInlineStyle & {
  // lodash get string eg. data.[index].xxx global.xxx
  text: string;
  isVariable?: true;
  type: 'value';
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText | InlineVariableText;
  }
}
