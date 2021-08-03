/** 短语 inline node */
export type IPhrase = TextPhrase | EntityPhrase;

/** 短语 -- 文本 */
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
  /** 类型 */
  entityType: 'value';
  /** 用于常见数据解读 encode  */
  assessment?: 'positive' | 'negative';
}

/** 行内元素富文本样式 */
interface InlineStyles {
  bold?: boolean;
  color?: string;
}
