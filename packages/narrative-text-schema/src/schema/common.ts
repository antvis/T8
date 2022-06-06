import { CSSProperties } from 'react';

/** common props for block ele and inline ele */
export type CommonProps = {
  styles?: CSSProperties;
  className?: string;
};

/** basic block element structure, used for extends */
export interface CustomMetaData {
  // customType is required for custom block structure
  customType: string;
  [key: string]: unknown;
}
