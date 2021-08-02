import { IPhrase } from './phrase';
import { IParagraph } from './paragraph';

export interface ITextSpec {
  headline?: IHeadline;
  sections?: ISection[];
  // TODO 可扩展内容交互
}

/** 标题 */
export interface IHeadline {
  type: 'headline';
  phrases: IPhrase[];
}

/** 章节 */
export interface ISection {
  paragraphs?: IParagraph[];
}
