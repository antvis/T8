/** common props for block ele and inline ele */
export type CommonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: Record<string, any>;
  className?: string;
  key?: string;
};

/** basic block element structure, used for extends */
export type CustomBlockElement = CommonProps & {
  // customType is required for custom block structure
  customType: string;
  [key: string]: unknown;
};

/** custom phrase metadata */
export type CustomMetaData = {
  // customType is required for custom block structure
  customType: string;
  [key: string]: unknown;
};

export type ElementType = 'section' | 'paragraph' | 'phrase' | 'narrative';
