import { CSSProperties } from 'react';
import { TDescendant } from '@udecode/plate-core';
import { VariableNodeData } from './plugins/variable';

export type VariableMap = Record<string, VariableNodeData>;

export interface NarrativeTextEditorProps {
  /** editor key, must unique */
  id: string;

  /** uncontrolled initial value */
  initialValue?: TDescendant[];

  // TODO 由于 slate 升级后 value 不再作为受控组件生效，暂时不提供受控组件的使用方式
  //  https://github.com/ianstormtaylor/slate/issues/4612
  /** controlled value */
  // value?: TDescendant[];

  /** editor value change */
  onChange?: (val: TDescendant[]) => void;

  /** editor inline style */
  style?: CSSProperties;

  /** enter variables via shortcut keys  */
  variableMap?: VariableMap;

  /** whether show heading toolbar */
  showHeadingToolbar?: boolean;

  /** whether show hovering toolbar */
  showHoveringToolbar?: boolean;

  /** read only */
  readOnly?: boolean;
}
