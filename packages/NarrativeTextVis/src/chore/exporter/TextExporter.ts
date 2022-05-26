import {
  NarrativeTextSpec,
  ParagraphSpec,
  SectionSpec,
  PhraseSpec,
  BulletItemSpec,
  isCustomSection,
  isStandardSection,
  isHeadingParagraph,
  isTextParagraph,
  isBulletParagraph,
  isCustomParagraph,
  isCustomPhrase,
  isEntityPhrase,
} from '@antv/narrative-text-schema';
import { pad } from 'lodash';
import { PluginManager } from '../plugin';

export class TextExporter extends PluginManager {
  getNarrativeText(spec: NarrativeTextSpec) {
    let text = '';
    if (spec?.headline?.phrases) text += this.getPhrasesText(spec.headline.phrases);
    if (spec?.sections) {
      text = spec?.sections?.reduce((prev, curr) => `${prev}${prev ? '\r\n' : ''}${this.getSectionText(curr)}`, text);
    }
    return text;
  }
  getSectionText(spec: SectionSpec) {
    if (isStandardSection(spec)) {
      return spec.paragraphs.reduce((prev, curr) => `${prev}\r\n${this.getParagraphText(curr)}`, '');
    }
    if (isCustomSection(spec)) {
      const descriptor = this.getBlockDescriptor(spec.customType);
      if (descriptor && descriptor?.getText) {
        return descriptor.getText(spec);
      }
    }
    return '';
  }
  getParagraphText(spec: ParagraphSpec) {
    if (isHeadingParagraph(spec) || isTextParagraph(spec)) return this.getPhrasesText(spec.phrases);
    if (isBulletParagraph(spec)) {
      return spec.bullets?.reduce(
        (prev, curr, index) =>
          `${prev}${prev ? '\r\n' : ''}${spec.isOrder ? `${index + 1}` : '· '}${this.getBulletsText(curr, 1)}`,
        '',
      );
    }
    if (isCustomParagraph(spec)) {
      const descriptor = this.getBlockDescriptor(spec.customType);
      if (descriptor && descriptor?.getText) {
        return descriptor.getText(spec);
      }
    }
    return '';
  }
  getBulletsText(spec: BulletItemSpec, level = 1): string {
    let text = '';
    if (spec?.phrases) {
      text = this.getPhrasesText(spec.phrases);
    }
    if (spec?.subBullet) {
      text = spec.subBullet.bullets?.reduce(
        (prev, curr, index) =>
          `${prev}\r\n${pad('', level * 2)}${spec.subBullet.isOrder ? `${index + 1}` : '· '}${this.getBulletsText(
            curr,
            level + 1,
          )}`,
        text,
      );
    }
    return text;
  }
  getPhrasesText(spec: PhraseSpec[]) {
    return spec.reduce((prev, curr) => {
      let text = '';
      if (isEntityPhrase(curr) || isCustomPhrase(curr)) {
        const descriptor = this.getPhraseDescriptorBySpec(curr);
        if (descriptor && descriptor?.getText) {
          text = descriptor.getText(curr.value, curr.metadata);
        }
      }
      return prev + text;
    }, '');
  }
}
