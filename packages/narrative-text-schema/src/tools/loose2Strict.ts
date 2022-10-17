import { getHeadingWeight } from './isType';
import { EntityType } from '../schema';
import type {
  LoosePhraseSpec,
  CustomBlockElement,
  HeadlineSpec,
  PhraseSpec,
  TextPhraseSpec,
  CustomPhraseSpec,
  LooseParagraphSpec,
  ParagraphSpec,
  LooseSectionSpec,
  NarrativeTextSpec,
  SectionSpec,
  LooseNarrativeTextSpec,
  BulletsParagraphSpec,
} from '../schema';

export function loosePhrase2StrictPhrase(loosePhrase: LoosePhraseSpec | undefined): PhraseSpec | undefined {
  if (!loosePhrase) return undefined;
  if (loosePhrase.type === 'text') {
    return { ...loosePhrase } as TextPhraseSpec;
  }
  if (EntityType.includes(loosePhrase.type as any)) {
    return {
      ...loosePhrase,
      type: 'entity',
      metadata: {
        entityType: loosePhrase.type as EntityType,
        ...loosePhrase.metadata,
      },
    };
  }

  const customPhrase = {
    ...loosePhrase,
    type: 'custom',
    metadata: {
      customType: loosePhrase.type,
      ...loosePhrase.metadata,
    },
  } as CustomPhraseSpec;

  return customPhrase;
}

export function looseParagraph2StrictParagraph(
  looseParagraph: LooseParagraphSpec | undefined,
): ParagraphSpec | HeadlineSpec | undefined {
  if (!looseParagraph) return undefined;

  if (
    looseParagraph.type === 'headline' ||
    looseParagraph.type === 'normal' ||
    (looseParagraph.type?.startsWith('heading') && getHeadingWeight(looseParagraph.type))
  ) {
    return {
      ...looseParagraph,
      type: looseParagraph.type,
      phrases: looseParagraph.phrases?.map(loosePhrase2StrictPhrase),
    } as any;
  }

  if (looseParagraph.type === 'bullets') {
    return {
      ...looseParagraph,
      isOrder: looseParagraph.isOrder || false,
      bullets: (looseParagraph.bullets || [])?.map((item) => ({
        type: 'bullet-item',
        phrases: item.phrases?.map(loosePhrase2StrictPhrase),
        subBullet: looseParagraph2StrictParagraph(looseParagraph.subBullet),
      })),
    } as BulletsParagraphSpec;
  }

  const customBlock = {
    ...looseParagraph,
    customType: looseParagraph.type,
    metadata: looseParagraph.metadata,
  } as CustomBlockElement;
  delete customBlock.type;

  return customBlock;
}

export function looseSection2StrictSection(looseSection: LooseSectionSpec | undefined): SectionSpec | undefined {
  if (!looseSection) return undefined;
  if (looseSection.type) {
    const customBlock = {
      ...looseSection,
      customType: looseSection.type,
      metadata: looseSection.metadata,
    };
    delete customBlock.type;
    return customBlock;
  }

  return {
    ...looseSection,
    paragraphs: looseSection.paragraphs?.map(looseParagraph2StrictParagraph) as ParagraphSpec[],
  };
}

export function looseNarrative2StrictNarrative(looseNarrative: LooseNarrativeTextSpec): NarrativeTextSpec {
  return {
    ...looseNarrative,
    headline: looseParagraph2StrictParagraph(looseNarrative?.headline) as HeadlineSpec,
    sections: looseNarrative.sections?.map(looseSection2StrictSection),
  };
}
