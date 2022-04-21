import { CSSProperties } from 'react';
import { TDescendant } from '@udecode/plate-core';
import { VariableNodeData } from './plugins/variable';

export type VariableMap = Record<string, VariableNodeData>;

export interface NarrativeTextEditorProps {
  /** plate editor key, must unique */
  id: string;
  /** editor value change */
  onChange: (val: TDescendant[]) => void;
  /** slate value */
  initialValue?: TDescendant[];
  /** editor inline style */
  style?: CSSProperties;
  /** enter variables via shortcut keys  */
  variableMap: VariableMap;
}
