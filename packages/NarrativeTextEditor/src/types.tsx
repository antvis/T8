// FIXME plate 11.x 之后需要自己指定类型，当前文件先直接 copy 官网 ts demo，之后再详细梳理

import { PluginOptions } from '@babel/core';
import { CSSProperties } from 'react';
import {
  createPlateEditor,
  CreatePlateEditorOptions,
  createPluginFactory,
  Decorate,
  DecorateEntry,
  DOMHandler,
  EDescendant,
  EElement,
  EElementEntry,
  EElementOrText,
  EMarks,
  ENode,
  ENodeEntry,
  EText,
  ETextEntry,
  getPlateActions,
  getPlateEditorRef,
  getPlateSelectors,
  getTEditor,
  InjectComponent,
  InjectProps,
  KeyboardHandler,
  NoInfer,
  OnChange,
  OverrideByKey,
  PlateEditor,
  PlatePlugin,
  PlatePluginInsertData,
  PlatePluginProps,
  PlateProps,
  SerializeHtml,
  TElement,
  TReactEditor,
  TText,
  useEditorRef,
  useEditorState,
  usePlateEditorRef,
  usePlateEditorState,
  usePlateSelectors,
  WithOverride,
  TDescendant,
  PlateStoreState,
  Value,
} from '@udecode/plate-core';

import { ELEMENT_H1, KEYS_HEADING } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_LINK, TLinkElement as LinkElement } from '@udecode/plate-link';
import { ELEMENT_LI, ELEMENT_UL, ELEMENT_OL } from '@udecode/plate-list';
import { PlaceholderProps } from '@udecode/plate-ui-placeholder';

import { CustomPlugin } from './plugins/custom';
import { HeadingToolbarProps } from './toolbar/HeadingToolbar';
import { VariableNodeData } from './plugins/variable';

export const BLOCK_KEYS = [...KEYS_HEADING, ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL] as const;

export type BlockKey = typeof BLOCK_KEYS[number];

/**
 * Text
 */

export type EmptyText = {
  text: '';
};

export interface RichText extends TText {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
}

/**
 * Inline Elements
 */

export interface MyInlineElement extends LinkElement {
  type: typeof ELEMENT_LINK;
  children: RichText[];
}

export type MyInlineDescendant = MyInlineElement | RichText;
export type MyInlineChildren = MyInlineDescendant[];

/**
 * Blocks
 */

export interface TParagraphElement extends TElement {
  type: typeof ELEMENT_PARAGRAPH;
  children: MyInlineChildren;
}

export interface TBulletedListElement extends TElement {
  type: typeof ELEMENT_UL;
  children: TListItemElement[];
}

export interface TNumberedListElement extends TElement {
  type: typeof ELEMENT_OL;
  children: TListItemElement[];
}

export interface TListItemElement extends TElement {
  type: typeof ELEMENT_LI;
  children: MyInlineChildren;
}

export interface THeadingElement extends TElement {
  type: typeof ELEMENT_H1;
  children: MyInlineChildren;
}

export type MyNestableBlock = TParagraphElement | TBulletedListElement | TNumberedListElement;

export type MyBlock = THeadingElement | MyNestableBlock;

export type MyValue = MyBlock[];

/**
 * Editor types
 */

export type MyEditor = PlateEditor<MyValue> & { typescript: boolean };
export type MyReactEditor = TReactEditor<MyValue>;
export type MyNode = ENode<MyValue>;
export type MyNodeEntry = ENodeEntry<MyValue>;
export type MyElement = EElement<MyValue>;
export type MyElementEntry = EElementEntry<MyValue>;
export type MyText = EText<MyValue>;
export type MyTextEntry = ETextEntry<MyValue>;
export type MyElementOrText = EElementOrText<MyValue>;
export type MyDescendant = EDescendant<MyValue>;
export type MyMarks = EMarks<MyValue>;
export type MyMark = keyof MyMarks;

/**
 * Plate types
 */

export type MyDecorate<P = PluginOptions> = Decorate<P, MyValue, MyEditor>;
export type MyDecorateEntry = DecorateEntry<MyValue>;
export type MyDOMHandler<P = PluginOptions> = DOMHandler<P, MyValue, MyEditor>;
export type MyInjectComponent = InjectComponent<MyValue>;
export type MyInjectProps = InjectProps<MyValue>;
export type MyKeyboardHandler<P = PluginOptions> = KeyboardHandler<P, MyValue, MyEditor>;
export type MyOnChange<P = PluginOptions> = OnChange<P, MyValue, MyEditor>;
export type MyOverrideByKey = OverrideByKey<MyValue, MyEditor>;
export type MyPlatePlugin<P = PluginOptions> = PlatePlugin<P, MyValue, MyEditor>;
export type MyPlatePluginInsertData = PlatePluginInsertData<MyValue>;
export type MyPlatePluginProps = PlatePluginProps<MyValue>;
export type MyPlateProps = PlateProps<MyValue, MyEditor>;
export type MySerializeHtml = SerializeHtml<MyValue>;
export type MyWithOverride<P = PluginOptions> = WithOverride<P, MyValue, MyEditor>;

/**
 * Plate store, Slate context
 */

export const getMyEditor = (editor: MyEditor) => getTEditor<MyValue, MyEditor>(editor);
export const useTEditorRef = () => useEditorRef<MyValue, MyEditor>();
export const useTEditorState = () => useEditorState<MyValue, MyEditor>();
export const useTPlateEditorRef = (id?: string) => usePlateEditorRef<MyValue, MyEditor>(id);
export const getTPlateEditorRef = (id?: string) => getPlateEditorRef<MyValue, MyEditor>(id);
export const useTPlateEditorState = (id?: string) => usePlateEditorState<MyValue, MyEditor>(id);
export const useTPlateSelectors = (id?: string) => usePlateSelectors<MyValue, MyEditor>(id);
export const getTPlateSelectors = (id?: string) => getPlateSelectors<MyValue, MyEditor>(id);
export const getTPlateActions = (id?: string) => getPlateActions<MyValue, MyEditor>(id);
export type VariableMap = Record<string, VariableNodeData>;

export interface NarrativeTextEditorProps {
  /** editor key, must unique */
  id: string;

  /** uncontrolled initial value */
  initialValue?: PlateStoreState<MyValue>['value'];

  // TODO 由于 slate 升级后 value 不再作为受控组件生效，暂时不提供受控组件的使用方式
  //  https://github.com/ianstormtaylor/slate/issues/4612
  /** controlled value */
  // value?: TDescendant[];

  /** editor value change */
  onChange?: (val: TDescendant[]) => void;

  plugins?: CustomPlugin[];

  /** editor inline style */
  style?: CSSProperties;

  /** whether show heading toolbar */
  showHeadingToolbar?: boolean | HeadingToolbarProps;

  /** whether show hovering toolbar */
  showHoveringToolbar?: boolean;

  /** editor block element draggable */
  draggable?: boolean;

  // TODO editor 整体空白时的 placeholder
  /** config placeholder by element key */
  placeholders?: Array<PlaceholderProps<Value> & { key: BlockKey; keys: BlockKey[] }>;

  /** read only */
  readOnly?: boolean;
}

/**
 * Utils
 */

export const createTPlateEditor = (options: CreatePlateEditorOptions<MyValue, MyEditor> = {}) =>
  createPlateEditor<MyValue, MyEditor>(options);
export const createTPluginFactory = <P = PluginOptions,>(defaultPlugin: PlatePlugin<NoInfer<P>, MyValue, MyEditor>) =>
  createPluginFactory(defaultPlugin);
