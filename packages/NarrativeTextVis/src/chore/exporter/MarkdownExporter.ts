/* eslint-disable radix */
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

export class MarkdownExporter extends PluginManager {
  getNarrativeMarkdown(spec: NarrativeTextSpec) {
    let text = '';
    if (spec?.headline?.phrases) text += `# ${this.getPhrasesMarkdown(spec.headline.phrases)}\r\n\r\n---`;
    if (spec?.sections) {
      text = spec?.sections?.reduce(
        (prev, curr) => `${prev}${prev ? '\r\n' : ''}${this.getSectionMarkdown(curr)}`,
        text,
      );
    }
    return text;
  }
  getSectionMarkdown(spec: SectionSpec) {
    if (isStandardSection(spec)) {
      return spec.paragraphs.reduce((prev, curr) => `${prev}\r\n${this.getParagraphMarkdown(curr)}`, '');
    }
    if (isCustomSection(spec)) {
      const descriptor = this.getBlockDescriptor(spec.customType);
      if (descriptor && descriptor?.getText) {
        return descriptor.getText(spec);
      }
    }
    return '';
  }
  getParagraphMarkdown(spec: ParagraphSpec) {
    if (isTextParagraph(spec)) return this.getPhrasesMarkdown(spec.phrases);
    if (isHeadingParagraph(spec)) {
      return `${'#'.repeat(parseInt(spec.type.slice(-1)))} ${this.getPhrasesMarkdown(spec.phrases)}`;
    }
    if (isBulletParagraph(spec)) {
      return spec.bullets?.reduce(
        (prev, curr, index) =>
          `${prev}${prev ? '\r\n' : ''}${spec.isOrder ? `${index + 1}. ` : '- '}${this.getBulletsMarkdown(curr, 1)}`,
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
  getBulletsMarkdown(spec: BulletItemSpec, level = 1): string {
    let text = '';
    if (spec?.phrases) {
      text = this.getPhrasesMarkdown(spec.phrases);
    }
    if (spec?.subBullet) {
      text = spec.subBullet.bullets?.reduce(
        (prev, curr, index) =>
          // padding number in markdown should be 4
          `${prev}\r\n${pad('', level * 4)}${spec.subBullet.isOrder ? `${index + 1}. ` : '- '}${this.getBulletsMarkdown(
            curr,
            level + 1,
          )}`,
        text,
      );
    }
    return text;
  }
  getPhrasesMarkdown(spec: PhraseSpec[]) {
    return spec.reduce((prev, curr) => {
      let text = curr?.value;
      if (isEntityPhrase(curr) || isCustomPhrase(curr)) {
        const descriptor = this.getPhraseDescriptorBySpec(curr);
        if (descriptor && descriptor?.getText) {
          text = descriptor.getText(curr.value, curr.metadata);
        }
      }
      // isTextPhrase
      else {
        if (curr.bold) {
          text = `**${text}**`;
        }
        if (curr.italic) {
          text = `*${text}*`;
        }
      }
      return prev + text;
    }, '');
  }
}
