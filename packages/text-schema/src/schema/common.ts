import { CSSProperties } from 'react';

/** common props for block ele and inline ele */
export type CommonProps = {
  styles?: CSSProperties;
  className?: string;
};

// TODO 期望可以替换 keyof 维护，但是文件不能循环引用，先手动维护吧
const retainKeys = ['type', 'paragraphs', 'phrases', 'isOrder', 'bullets', 'subBullet'] as const;

type ExcludeKeys = Record<typeof retainKeys[number], never>;

/** basic block element structure, used for extends */
export type DefaultCustomBlockStructureGeneric =
  | null
  | ({
      // customType is required for custom block structure
      customType: string;
      [key: string]: unknown;
    } & ExcludeKeys);

export type DefaultCustomPhraseGeneric = Record<string, unknown>;
