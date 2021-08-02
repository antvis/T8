/** 短语 inline node */
export type IPhrase = TextPhrase;

/** 短语 -- 文本 */
interface TextPhrase {
  type: 'text';
  value: string;
  metadata?: Metadata;
  styles?: InlineStyles;
}

/** 特定节点标记 */
interface Metadata {
  /** 是否数值 */
  isValue?: boolean;
  /** 用于常见数据解读 encode  */
  assessment?: 'positive' | 'negative';
  // TODO 洞察描述及其交互
  // isAnnotation: boolean;
  // TODO 点击获得 detail data
  // data?: unknown
}

/** 行内元素富文本样式 */
interface InlineStyles {
  bold?: boolean;
  color?: string;
}
