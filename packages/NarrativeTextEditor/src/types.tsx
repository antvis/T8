import { CSSProperties, PropsWithChildren } from 'react';
import { PlateStoreState, Value, TDescendant, PlatePlugin } from '@udecode/plate-core';

import { KEYS_HEADING } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_UL, ELEMENT_OL } from '@udecode/plate-list';
import { PlaceholderProps } from '@udecode/plate-ui-placeholder';

import { CustomPlugin } from './plugins/custom';
import { HeadingToolbarProps } from './toolbar/HeadingToolbar';
import { VariableNodeData } from './plugins/variable';

export const BLOCK_KEYS = [...KEYS_HEADING, ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL] as const;

export type BlockKey = typeof BLOCK_KEYS[number];

export type VariableMap = Record<string, VariableNodeData>;

export type NarrativeTextEditorProps = PropsWithChildren<{
  /** editor key, must unique */
  id: string;

  /** uncontrolled initial value */
  initialValue?: PlateStoreState<Value>['value'];

  // TODO 由于 slate 升级后 value 不再作为受控组件生效，暂时不提供受控组件的使用方式
  //  https://github.com/ianstormtaylor/slate/issues/4612
  /** controlled value */
  // value?: TDescendant[];

  /** editor value change */
  onChange?: (val: TDescendant[]) => void;

  /** custom non editable element plugins */
  plugins?: CustomPlugin[];

  /** expansible by raw plate plugin */
  platePlugins?: PlatePlugin[];

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
  placeholders?: boolean | Array<Partial<PlaceholderProps<Value> & { key: BlockKey; keys: BlockKey[] }>>;

  /** read only */
  readOnly?: boolean;

  /** single line */
  singleLine?: boolean;
}>;

export interface NarrativeTextEditorRef {
  setValue: (value: TDescendant[]) => void;
}

export type TemplateEditorProps = PropsWithChildren<
  Omit<NarrativeTextEditorProps, 'plugins' | 'platePlugins'> & {
    variableMap: VariableMap;
  }
>;
