import { EntityPhraseSpec, NarrativeTextSpec, PhraseSpec } from '../schema';

export const extractVariables = (spec: NarrativeTextSpec) => {
  const variables: EntityPhraseSpec[] = [];
  const { headline, sections } = spec;
  const phrases: PhraseSpec[] = [];
  if (headline?.phrases) {
    phrases.push(...headline.phrases);
  }

  sections?.forEach((section) => {
    section.paragraphs?.forEach((paragraph) => {
      if (paragraph?.type === 'normal') {
        phrases.push(...paragraph.phrases);
      }
      if (paragraph?.type === 'bullets') {
        paragraph.bullets.forEach((bullet) => {
          phrases.push(...bullet.phrases);
        });
      }
    });
  });

  phrases.forEach((phrase) => {
    if (phrase.type === 'entity') {
      variables.push(phrase);
    }
  });
  return variables;
};
