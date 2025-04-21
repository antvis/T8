import {
  BulletsParagraphSpec,
  EntityPhraseSpec,
  NarrativeTextSpec,
  ParagraphSpec,
  ParagraphType,
  PhraseSpec,
  PhraseType,
} from "../schema";

// extract the variables from the schema
export const getVariableMap = (spec: NarrativeTextSpec) => {
  const variableMap: Record<string, EntityPhraseSpec> = {};
  const { headline, sections } = spec;
  const allPhrases: PhraseSpec[] = [];
  if (headline?.phrases) {
    allPhrases.push(...headline.phrases);
  }

  const addPhrases = (paragraph: ParagraphSpec) => {
    switch (paragraph?.type) {
      case ParagraphType.HEADING1:
      case ParagraphType.HEADING2:
      case ParagraphType.HEADING3:
      case ParagraphType.HEADING4:
      case ParagraphType.HEADING5:
      case ParagraphType.HEADING6:
      case ParagraphType.NORMAL: {
        const phrases = paragraph.phrases as PhraseSpec[];
        if (phrases?.length) {
          allPhrases.push(...phrases);
        }
        break;
      }
      case ParagraphType.BULLETS: {
        (paragraph.bullets as BulletsParagraphSpec["bullets"])?.forEach(
          (bullet) => {
            const { subBullet, phrases } = bullet;
            if (phrases?.length) {
              allPhrases.push(...phrases);
            }
            if (subBullet) {
              addPhrases(subBullet);
            }
          },
        );
        break;
      }
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
    if (phrase.type === PhraseType.ENTITY) {
      const variableKey =
        phrase.metadata?.sourceId || `variable_${(variableIndex += 1)}`;
      variableMap[variableKey] = phrase;
    }
  });
  return variableMap;
};
