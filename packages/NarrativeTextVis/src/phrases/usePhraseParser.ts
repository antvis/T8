import { useEffect, useState } from 'react';
import PhraseParser from './PhraseParser';
import { BasicPhraseProps } from './interface';

// TODO phrase update
/** phrase info with ui */
export const usePhraseParser = ({ phrase, customEntityEncoding }: BasicPhraseProps) => {
  const [phraseMeta, setPhraseMeta] = useState<PhraseParser>(new PhraseParser(phrase, customEntityEncoding));

  useEffect(() => {
    setPhraseMeta(new PhraseParser(phrase, customEntityEncoding));
  }, [phrase, customEntityEncoding]);

  return {
    classNames: phraseMeta.classNames,
    styles: { ...(phraseMeta?.encodingStyles || {}), ...(phrase?.styles || {}) },
    Content: phraseMeta.Content,
    type: phraseMeta.type,
    assessment: phraseMeta.assessment,
  };
};
