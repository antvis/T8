import { IPhrase, ValueAssessment, IEntityType } from '@antv/text-schema';
import { getPrefixCls } from './getPrefixCls';
import { get } from './get';

/** text & entity */
type PhraseType = 'text' | IEntityType | null;

export class PhraseParser {
  private phrase: IPhrase;
  public type: PhraseType;
  /** compare assessment */
  public assessment: ValueAssessment | null;
  public originalData: number | undefined;
  private text: string;
  /** use className to encode value */
  public classNames: string[];

  constructor(phrase: IPhrase) {
    this.phrase = phrase;
    this.type = this.setType();
    this.originalData = get(phrase, 'metadata.data', undefined);
    this.assessment = get(phrase, 'metadata.assessment', null);
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
   * value
   * */
  private getText(): string {
    if (this.type === 'text') return this.phrase.value;
    if (this.phrase.value) return this.phrase.value;
    return '';
  }

  private getClassNames(): string[] {
    const classNames: string[] = [];
    const classNameMap: Partial<Record<IEntityType, string>> = {
      metric_name: 'metric-name',
      metric_value: 'metric-value',
      contribute_ratio: 'contribute-ratio',
      trend_desc: 'trend-desc',
      dim_value: 'dim-value',
    };
    if (this.type !== 'text') {
      classNames.push(getPrefixCls('value'));
      const entityCl = classNameMap?.[this.type];
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
