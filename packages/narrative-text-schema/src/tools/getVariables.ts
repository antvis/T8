import { BulletsParagraphSpec, EntityPhraseSpec, NarrativeTextSpec, ParagraphSpec, PhraseSpec } from '../schema';

// 抽取 spec 中的 变量列表
export const getVariableMap = (spec: NarrativeTextSpec) => {
  const variableMap: Record<string, EntityPhraseSpec> = {};
  const { headline, sections } = spec;
  const allPhrases: PhraseSpec[] = [];
  if (headline?.phrases) {
    allPhrases.push(...headline.phrases);
  }

  const addPhrases = (paragraph: ParagraphSpec) => {
    switch (paragraph?.type) {
      case 'heading1':
      case 'heading2':
      case 'heading3':
      case 'heading4':
      case 'heading5':
      case 'heading6':
      case 'normal': {
        const phrases = paragraph.phrases as PhraseSpec[];
        if (phrases?.length) {
          allPhrases.push(...phrases);
        }
        break;
      }
      case 'bullets':
        (paragraph.bullets as BulletsParagraphSpec['bullets'])?.forEach((bullet) => {
          const { subBullet, phrases } = bullet;
          if (phrases?.length) {
            allPhrases.push(...phrases);
          }
          if (subBullet) {
            addPhrases(subBullet);
          }
        });
        break;
      default:
        break;
    }
  };

  sections?.forEach((section) => {
    (section.paragraphs as ParagraphSpec[])?.forEach((paragraph) => {
      addPhrases(paragraph);
    });
  });

  let variableIndex = 0;
  allPhrases.forEach((phrase) => {
    if (phrase.type === 'entity') {
      const variableKey = phrase.metadata?.id || `variable_${(variableIndex += 1)}`;
      variableMap[variableKey] = phrase;
    }
  });
  return variableMap;
};
