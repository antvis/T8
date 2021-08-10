import { get, isUndefined, isString } from 'lodash';
import numeral from 'numeral';
import { Argument } from 'classnames';
import { IPhrase, ValueAssessment, IEntityType } from '@antv/text-schema';
import { getPrefixCls } from './getPrefixCls';

/** text & entity */
type PhraseType = 'text' | IEntityType | null;

/** compare */
const compareType: PhraseType[] = ['ratio_value', 'delta_value'];

class PhraseParser {
  private phrase: IPhrase;
  public type: PhraseType;
  /** compare assessment */
  public assessment: ValueAssessment | null;
  public originalData: number | undefined;
  private text: string;
  /** use className to encode value */
  public classNames: Argument[];

  constructor(phrase: IPhrase) {
    this.phrase = phrase;
    this.type = this.setType();
    this.originalData = get(phrase, 'metadata.data', undefined);
    this.assessment = this.setAssessment();
    this.text = this.getText();
    this.classNames = this.getClassNames();
  }

  private setType(): PhraseType {
    if (this.phrase.type === 'text') return 'text';
    // TODO 判断一下 metadata 的 type 是否在规定范围内
    if (this.phrase.type === 'entity' && this.phrase?.metadata?.entityType) return this.phrase?.metadata?.entityType;
    return null;
  }

  /**
   * prefix of value, up or down
   * FIXME
   * TBD: 没有对比意义的数值直接返回 null，如果有 metadata.assessment 就用这个，否则判断 originalData
   * */
  private setAssessment(): ValueAssessment | null {
    if (!compareType.includes(this.type)) return null;
    const as = get(this.phrase, 'metadata.assessment', null);
    if (as) return as;
    // eslint-disable-next-line no-nested-ternary
    if (this.originalData) return this.originalData > 0 ? 'positive' : this.originalData < 0 ? 'negative' : 'equal';
    return null;
  }

  /**
   * text || formatted data
   * FIXME
   * TBD: 如果有 value 则用 value，否则去看 data & format
   * */
  private getText(): string {
    if (this.type === 'text') return this.phrase.value;
    if (this.phrase.value) return this.phrase.value;
    const format = get(this.phrase, 'metadata.format', undefined);
    if (!isUndefined(this.originalData)) {
      const data = this.assessment ? Math.abs(this.originalData) : this.originalData;
      return isString(format) ? numeral(data).format(format) : `${data}`;
    }
    return '';
  }

  private getClassNames(): Argument[] {
    const classNames: Argument[] = [];
    const classNameMap: Partial<Record<IEntityType, string>> = {
      metric_name: 'metric-name',
      metric_value: 'metric-value',
      contribute_ratio: 'contribute-ratio',
      trend_desc: 'trend-desc',
      dim_value: 'dim-value',
    };
    if (this.type !== 'text') {
      classNames.push(getPrefixCls('value'));
      const entityCl = get(classNameMap, this.type);
      if (entityCl) classNames.push(getPrefixCls(entityCl));
    }
    if (this.assessment) classNames.push(getPrefixCls(`value-${this.assessment}`));
    return classNames;
  }

  get content() {
    return this.text;
  }
}

export const parsePhrase = (phrase: IPhrase) => new PhraseParser(phrase);

// /** render content, exclude interaction component */
