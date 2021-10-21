import React, { ReactNode, CSSProperties } from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { IPhrase, ValueAssessment, IEntityType } from '@antv/text-schema';
import { get, kebabCase } from 'lodash-es';
import { getPrefixCls } from './getPrefixCls';
import { CustomEntityEncoding, EncodingChannels } from '../interface';
import { ASSESSMENT_TYPE } from '../constance';

/** text & entity */
type PhraseType = 'text' | IEntityType | null;

function getDefaultPrefix(type: PhraseType, assessment: ValueAssessment): ReactNode {
  switch (type) {
    case 'delta_value':
      return assessment === 'positive' ? '+' : assessment === 'negative' ? '-' : '';
    case 'ratio_value':
      return assessment === 'positive' ? <CaretUpOutlined /> : assessment === 'negative' ? <CaretDownOutlined /> : '';
    default:
      return '';
  }
}

function getNode(
  position: 'prefix' | 'suffix',
  encoding: EncodingChannels,
  assessment?: ValueAssessment,
  defaultNode: ReactNode = '',
): ReactNode {
  if (assessment) {
    const assessmentChannel = get(encoding, ['assessment', assessment, position]);
    if (assessmentChannel) return assessmentChannel;
  }
  return get(encoding, position, defaultNode);
}

/**
 * meta info of phrase, including encoding channels
 */
class PhraseParser {
  /** original spec */
  private phrase!: IPhrase;
  private customEntityEncoding?: CustomEntityEncoding;
  /** clear type */
  private type!: PhraseType;
  /**
   * compare assessment -- extensible encoding channel
   * assessment encoding has higher priority then the outer layer
   * */
  public assessment?: ValueAssessment | null;
  /** main content string value */
  public text?: string;
  /**
   * use className to make default encoding
   *    * Users can custom encoding by override class styles
   * */
  public classNames!: string[];
  /** use style to make custom encoding */
  public encodingStyles!: CSSProperties;
  /** encoding prefix */
  private Prefix?: ReactNode;
  /** encoding suffix */
  private Suffix?: ReactNode;

  constructor(phrase: IPhrase, entityEncoding?: CustomEntityEncoding) {
    this.phrase = phrase;
    this.customEntityEncoding = entityEncoding;
    this.type = this.getType();
    this.assessment = this.getAssessment();
    this.text = this.getText();
    this.classNames = this.getClassNames();
    this.encodingStyles = this.getEncodingStyles();
    this.Prefix = this.getPrefix();
    this.Suffix = this.getSuffix();
  }

  private getType(): PhraseType {
    if (this.phrase.type === 'text') return 'text';
    // TODO 判断一下 metadata 的 type 是否在规定范围内
    if (this.phrase.type === 'entity' && this.phrase?.metadata?.entityType) return this.phrase?.metadata?.entityType;
    return null;
  }

  private get encodingWithAssessment() {
    return ASSESSMENT_TYPE.includes(this.type);
  }

  // TODO 现在只读取指定 assessment，加入 original data 和 format 能力之后可从 data 获取
  private getAssessment(): ValueAssessment | null {
    return this.encodingWithAssessment ? get(this.phrase, 'metadata.assessment', null) : null;
  }

  // TODO 现在只有 value 信息，之后加入 original data 和 format 能力之后数值类型的会在这里
  private getText(): string {
    if (this.type === 'text') return this.phrase.value;
    if (this.phrase.value) return this.phrase.value;
    return '';
  }

  private getClassNames(): string[] {
    const classNames: string[] = [];
    if (this.type !== 'text') {
      classNames.push(getPrefixCls('value'));
      // generate default className easy to extends
      const entityCl = kebabCase(this.type);
      if (entityCl) classNames.push(getPrefixCls(entityCl));
    }
    if (this.assessment) {
      classNames.push(getPrefixCls(`value-${this.assessment}`));
    }
    return classNames;
  }

  private getEncodingStyles(): CSSProperties {
    const styles: CSSProperties = {};
    if (this.customEntityEncoding) {
      const typeStyles = this.customEntityEncoding[this.type];
      if (typeStyles) {
        styles.color = typeStyles?.color;
        styles.backgroundColor = typeStyles?.backgroundColor;
      }
      if (this.assessment) {
        const assessmentStyle = get(this.customEntityEncoding, [this.type, 'assessment', this.assessment]);
        if (assessmentStyle) {
          styles.color = assessmentStyle?.color;
          styles.backgroundColor = assessmentStyle?.backgroundColor;
        }
      }
    }
    return styles;
  }

  private getPrefix(): ReactNode {
    const defaultPrefix = this.assessment ? getDefaultPrefix(this.type, this.assessment) : '';
    if (!this.customEntityEncoding?.[this.type]) return defaultPrefix;
    return getNode('prefix', this.customEntityEncoding[this.type], this.assessment, defaultPrefix);
  }

  private getSuffix(): ReactNode {
    if (!this.customEntityEncoding?.[this.type]) return '';
    return getNode('suffix', this.customEntityEncoding[this.type], this.assessment);
  }

  public get Content(): ReactNode {
    return (
      <>
        {this.Prefix}
        {this.text}
        {this.Suffix}
      </>
    );
  }

  // TODO hover tooltip 或者是 wsv 的内容
  // get DetailContent(): ReactNode {
  //   if (this.type === 'ratio_value') {
  //   }
  //   return null;
  // }
}

export default PhraseParser;
