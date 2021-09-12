/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { ITextSpec, IParagraph, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Headline, TextLine, Bullets } from './paragraphs';
import { PhraseCtxProvider, usePhraseCtx } from './context/phrase';
import { DetailChartDisplayType, CustomPhraseRender } from './interface';

export interface NarrativeTextVisProps<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> {
  spec: ITextSpec<P>;
  /** use detail data to render chart, define how to display it  */
  detailChartDisplayType?: DetailChartDisplayType;
  /** custom phrase render comp, is not defined, it will use text as default */
  customPhraseRender?: CustomPhraseRender<P>;
}

interface ParagraphProps<P> {
  paragraph: IParagraph<P>;
  customPhraseRender?: CustomPhraseRender<P>;
}

export function Paragraph<P extends DefaultCustomPhraseGeneric>({ paragraph, customPhraseRender }: ParagraphProps<P>) {
  switch (paragraph.type) {
    case 'normal':
      return <TextLine<P> spec={paragraph} customPhraseRender={customPhraseRender} />;
    case 'bullets':
      return <Bullets<P> spec={paragraph} customPhraseRender={customPhraseRender} />;
    default:
      return null;
  }
}

Paragraph.defaultProps = {
  customPhraseRender: null,
};

function NarrativeTextVisInternal<P extends DefaultCustomPhraseGeneric>({
  spec,
  customPhraseRender,
  detailChartDisplayType,
}: NarrativeTextVisProps<P>) {
  const { setDetailChartDisplayType } = usePhraseCtx();

  useEffect(() => {
    if (detailChartDisplayType) setDetailChartDisplayType(detailChartDisplayType);
  }, [detailChartDisplayType]);

  const { headline, sections } = spec;
  return (
    <div>
      {headline ? <Headline spec={headline} customPhraseRender={customPhraseRender} /> : null}
      {sections
        ? sections?.map((section, index) => (
            <div key={index}>
              {section.paragraphs?.map((p, pid) => (
                <Paragraph<P> paragraph={p} key={pid} customPhraseRender={customPhraseRender} />
              ))}
            </div>
          ))
        : null}
    </div>
  );
}

export function NarrativeTextVis<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric>(
  props: NarrativeTextVisProps<P>,
) {
  return (
    <PhraseCtxProvider>
      <NarrativeTextVisInternal<P> {...props} />
    </PhraseCtxProvider>
  );
}
