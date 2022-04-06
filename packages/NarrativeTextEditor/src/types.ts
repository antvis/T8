import { TDescendant } from '@udecode/plate-core';

export interface NarrativeTextEditorProps {
  /** plate editor key, must unique */
  id: string;
  /** slate value */
  initialValue: TDescendant[];
  onChange: (val: TDescendant[]) => void;
}
