import React, { ReactNode, CSSProperties } from 'react';
import { PhraseSpec, ValueAssessment } from '@antv/narrative-text-schema';
import { get, kebabCase, isArray } from 'lodash';
import { Bold, Italic, Underline } from '../styled';
import { getPrefixCls } from '../utils/getPrefixCls';
import { ArrowDown, ArrowUp } from '../assets/icons';
import { CustomEntityEncoding, EncodingChannels, PhraseType } from '../interface';
import { ASSESSMENT_TYPE } from '../constance';

/** text & entity */
const isNaN = (v: unknown) => Number.isNaN(v);

/**
 * meta info of phrase, including encoding channels
 */
class PhraseParser {
  /** original spec */
  private phrase!: PhraseSpec;
  private customEntityEncoding?: CustomEntityEncoding;
  /** clear type */
  public type!: PhraseType;
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
  /** inline word scale chart */
  private Chart?: ReactNode;

  constructor(phrase: PhraseSpec, entityEncoding?: CustomEntityEncoding) {
    this.phrase = phrase;
    this.customEntityEncoding = entityEncoding;
    this.type = this.getType();
    this.assessment = this.getAssessment();
    this.text = this.getText();
    this.classNames = this.getClassNames();
    this.encodingStyles = this.getEncodingStyles();
    this.Prefix = this.getPrefix();
    this.Suffix = this.getSuffix();
    this.Chart = this.getChart();
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

  private getChart(): ReactNode {
    if (this.phrase.type === 'entity' && this.type === 'proportion') {
      return <wsc-proportion data={getProportionNumber(this.text, this.phrase?.metadata.origin as number)} />;
    }
    if (this.phrase.type === 'entity' && this.type === 'trend_desc') {
      const detailData = this.phrase?.metadata?.detail;
      if (isArray(detailData) && detailData.length) return <wsc-line data={`[${detailData}]`} />;
    }
    return '';
  }

  public get Content(): ReactNode {
    let main: ReactNode = this.text;
    if (this.phrase.type === 'text') {
      if (this.phrase.bold) main = <Bold>{main}</Bold>;
      if (this.phrase.italic) main = <Italic>{main}</Italic>;
      if (this.phrase.underline) main = <Underline>{main}</Underline>;
    }

    return (
      <>
        {this.Prefix ? <span style={{ marginRight: 2 }}>{this.Prefix}</span> : null}
        {main}
        {this.Suffix}
        {this.Chart}
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

function getDefaultPrefix(type: PhraseType, assessment: ValueAssessment): ReactNode {
  switch (type) {
    case 'delta_value':
      return assessment === 'positive' ? '+' : assessment === 'negative' ? '-' : '';
    case 'ratio_value':
      return assessment === 'positive' ? <ArrowUp /> : assessment === 'negative' ? <ArrowDown /> : '';
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

function getProportionNumber(text: string, value?: number | undefined): number {
  if (value && !isNaN(value)) return value;
  if (text?.endsWith('%')) {
    const percentageValue = text?.replace(/%$/, '');
    if (!isNaN(Number(percentageValue))) return Number(percentageValue) / 100;
  }
  return NaN;
}

export default PhraseParser;
