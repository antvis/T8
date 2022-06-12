import { ReactNode } from 'react';
import { Range } from 'slate';

export type CommandPanelPlugin = {
  /**
   * @default "/"
   */
  trigger?: string;
};

export type CommandItem = {
  icon: ReactNode;
  label: ReactNode;
  key: string;
  group: string;
  order: number;
  schematic?: string;
};

export type CommandPanelState = {
  items: CommandItem[];
  /**
   * Range from the trigger to the cursor.
   */
  targetRange: Range | null;

  /**
   * Text after the trigger.
   */
  text: string | null;
};
