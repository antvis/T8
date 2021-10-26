/**
 * get text by spec, used for copy text
 */
import {
  ITextSpec,
  IParagraph,
  ISection,
  IPhrase,
  IBulletItem,
  DefaultCustomBlockStructureGeneric,
  DefaultCustomPhraseGeneric,
} from '@antv/text-schema';
import { pad } from 'lodash-es';
import PhraseParser from '../utils/phrase-parser';

type GetCustomStructureTextFun<S extends DefaultCustomBlockStructureGeneric = null> = (spec: S) => string;

type GetCustomPhraseTextFun<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = (
  spec: IPhrase<P>,
) => string;

function getPhrases<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric>(
  spec: IPhrase<P>[],
  sign = false,
  getCustomPhraseText?: GetCustomPhraseTextFun<P>,
): string {
  return spec.reduce((prev, curr) => {
    let text = '';
    if (curr.type === 'custom' && getCustomPhraseText) {
      if (getCustomPhraseText) {
        text = getCustomPhraseText(curr);
      } else if (curr?.value) {
        text = curr.value;
      }
    }
    const phraseMeta = new PhraseParser(curr);
    let prefix = '';
    if (phraseMeta?.assessment === 'negative') prefix = '-';
    if (sign && phraseMeta?.assessment === 'positive') prefix = '+';
    text = prefix + (phraseMeta?.text || '');
    return prev + text;
  }, '');
}

function getBulletsText<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric>(
  spec: IBulletItem<P>,
  level = 1,
  sign = false,
  getCustomPhraseText?: GetCustomPhraseTextFun<P>,
): string {
  let text = '';
  if (spec?.phrases) {
    text = getPhrases(spec.phrases, sign);
  }
  if (spec?.subBullet) {
    text = spec.subBullet.bullets?.reduce(
      (prev, curr, index) =>
        `${prev}\r\n${pad('', level * 2)}${spec.subBullet.isOrder ? `${index + 1}` : '· '}${getBulletsText(
          curr,
          level + 1,
          sign,
          getCustomPhraseText,
        )}`,
      text,
    );
  }
  return text;
}

export function getParagraphText<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>(
  spec: IParagraph<S, P>,
  sign = false,
  getCustomStructureText?: GetCustomStructureTextFun<S>,
  getCustomPhraseText?: GetCustomPhraseTextFun<P>,
): string {
  if (spec?.type === 'normal' && spec?.phrases) return getPhrases(spec.phrases, sign, getCustomPhraseText);
  if (spec?.type === 'bullets' && spec?.bullets) {
    return spec.bullets?.reduce(
      (prev, curr, index) =>
        `${prev}${prev ? '\r\n' : ''}${spec.isOrder ? `${index + 1}` : '· '}${getBulletsText(
          curr,
          1,
          sign,
          getCustomPhraseText,
        )}`,
      '',
    );
  }
  // @ts-ignore 这里推断不出来自定义段落了
  if ('customType' in spec && spec?.customType && getCustomStructureText) return getCustomStructureText(spec);
  return '';
}

export function getSectionText<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>(
  spec: ISection<S, P>,
  sign = false,
  getCustomStructureText?: GetCustomStructureTextFun<S>,
  getCustomPhraseText?: GetCustomPhraseTextFun<P>,
): string {
  if (spec?.paragraphs) {
    return spec.paragraphs.reduce(
      (prev, curr) => `${prev}\r\n${getParagraphText<S, P>(curr, sign, getCustomStructureText, getCustomPhraseText)}`,
      '',
    );
  }
  if ('customType' in spec && spec?.customType && getCustomStructureText) return getCustomStructureText(spec);
  return '';
}

export function getNarrativeText<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>(
  spec: ITextSpec<S, P>,
  sign = true,
  getCustomStructureText?: GetCustomStructureTextFun<S>,
  getCustomPhraseText?: GetCustomPhraseTextFun<P>,
): string {
  let text = '';
  if (spec?.headline?.phrases) text += getPhrases<P>(spec.headline.phrases, sign);
  if (spec?.sections) {
    text = spec?.sections?.reduce(
      (prev, curr) =>
        `${prev}${prev ? '\r\n' : ''}${getSectionText<S, P>(curr, sign, getCustomStructureText, getCustomPhraseText)}`,
      text,
    );
  }
  return text;
}
