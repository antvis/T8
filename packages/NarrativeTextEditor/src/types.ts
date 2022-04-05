import type { TDescendant } from '@udecode/plate';

export interface NarrativeTextEditorProps {
  /** plate editor key, must unique */
  id: string;
  /** slate value */
  initialValue: TDescendant[];
  onChange: (val: TDescendant[]) => void;
}
