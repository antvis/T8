import { CSSProperties } from 'react';

/** common props for block ele and inline ele */
export type CommonProps = {
  styles?: CSSProperties;
  className?: string;
};

// TODO 期望可以在类型上约束不能使用已有保留字
const retainKeys = ['type', 'paragraphs', 'phrases', 'isOrder', 'bullets', 'subBullet'] as const;

type ExcludeKeys = Partial<Record<typeof retainKeys[number], never>>;

/** basic block element structure, used for extends */
export interface DefaultBlockStructure extends ExcludeKeys {
  // customType is required for custom block structure
  customType: string;
  [key: string]: unknown;
}

export type DefaultCustomBlockStructureGeneric = null | DefaultBlockStructure;

export type DefaultCustomPhraseGeneric = Record<string, unknown>;
