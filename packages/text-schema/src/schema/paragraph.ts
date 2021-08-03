import { IPhrase } from './phrase';

/** 段落结构：一句话 或者 */
export type IParagraph = TextParagraph | BulletsParagraph;

/** 一句话 != 一段话，一段话由多句组成 */
interface TextParagraph {
  type: 'normal';
  phrases: IPhrase[];
  styles?: BlockStyles;
}

/** <ul></ul> */
interface BulletsParagraph {
  type: 'bullets';
  isOrder: boolean;
  // 用于扩展多层级
  bullets: BulletItem[];
  styles?: BlockStyles;
}

interface BulletItem {
  type: 'bullet-item';
  phrases: IPhrase[];
  // 这里的 isOrder 管下一级是否有序
  isOrder?: boolean;
  bullets?: BulletItem[];
  styles?: BlockStyles;
}

/** 块级样式 */
interface BlockStyles {
  color?: string;
  backgroundColor?: string;
  textAlign: 'left' | 'center' | 'right';
}
