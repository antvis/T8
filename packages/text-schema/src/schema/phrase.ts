export type IPhrase = TextPhrase | EntityPhrase;

interface TextPhrase {
  type: 'text';
  value: string;
  styles?: InlineStyles;
}

interface EntityPhrase {
  type: 'entity';
  value?: string;
  metadata?: Metadata;
  styles?: InlineStyles;
}

/** 特定节点标记 */
interface Metadata {
  /** specific type to encoding */
  entityType: 'value';
  // TODO 也许之后会换掉
  assessment?: 'positive' | 'negative';
}

interface InlineStyles {
  bold?: boolean;
  color?: string;
}
