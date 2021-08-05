import { IPhrase } from './phrase';
import { IParagraph } from './paragraph';

export interface ITextSpec {
  headline?: IHeadline;
  sections?: ISection[];
  // TODO 可扩展内容交互
}

export interface IHeadline {
  type: 'headline';
  phrases: IPhrase[];
}

export interface ISection {
  paragraphs?: IParagraph[];
}
