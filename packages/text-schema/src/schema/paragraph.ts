import { IPhrase } from './phrase';

export type IParagraph = TextParagraph | BulletsParagraph;

interface TextParagraph {
  type: 'normal';
  phrases: IPhrase[];
  styles?: BlockStyles;
}

interface BulletsParagraph {
  type: 'bullets';
  isOrder: boolean;
  // used for nested bullets structure
  bullets: BulletItem[];
  styles?: BlockStyles;
}

interface BulletItem {
  type: 'bullet-item';
  phrases: IPhrase[];
  // used for next level of bullets
  isOrder?: boolean;
  bullets?: BulletItem[];
  styles?: BlockStyles;
}

interface BlockStyles {
  color?: string;
  backgroundColor?: string;
  textAlign: 'left' | 'center' | 'right';
}
