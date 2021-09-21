import { Tag, message } from 'antd';
import {
  NarrativeTextVis,
  Section,
  ITextSpec,
  ICustomPhrase,
  DefaultBlockStructure as S,
} from '@antv/narrative-text-vis';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import remarkGfm from 'remark-gfm';

import {
  ModalShowDetail,
  ModalShowDetailMeta,
} from '../components/ModalShowDetail';
import AnchorLayout from '../components/AnchorLayout';
import ContentBlock from '../components/ContentBlock';
import HighlightCode from '../components/HighlightCode';

import getAnchors from '../utils/get-anchors';

import booking from '../data/booking.json';

const markdown = `
### Use markdown to show todo list

* [ ] todo
* [x] done
`;

const anchors = getAnchors('custom', [
  // 'custom phrase render and interaction',
  'section with custom paragraph',
  'narrative with custom phrase and section',
]);

interface CustomBlock extends S {
  value: string;
}

const markdownBlockRender = (spec: CustomBlock) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} children={spec.value} />
);

type ClickTagMeta = {
  popMsg: string;
};

const clickTagRender = (phrase: ICustomPhrase<ClickTagMeta>) => (
  <Tag
    color="purple"
    onClick={() => {
      message.success(phrase?.metadata?.popMsg);
    }}
    style={{ cursor: 'pointer' }}
  >
    {phrase.value}
  </Tag>
);

const modalShowDetailRender = (phrase: ICustomPhrase<ModalShowDetailMeta>) => {
  if (
    phrase.metadata?.interaction === 'click' &&
    phrase.metadata?.show === 'modal'
  ) {
    return <ModalShowDetail phrase={phrase} />;
  }
  return null;
};

type CustomNarrative = ITextSpec<CustomBlock, ModalShowDetailMeta>;

const extendBooking: CustomNarrative = {
  headline: (booking as CustomNarrative).headline,
  sections: [
    ...((booking as CustomNarrative).sections || []),
    {
      customType: 'markdown',
      value: markdown,
    },
  ],
};

export default function CustomPage() {
  return (
    <AnchorLayout anchorLinks={anchors}>
      <ContentBlock id={anchors[0].id} title={anchors[0].title}>
        <Section<CustomBlock, ClickTagMeta>
          spec={{
            paragraphs: [
              {
                type: 'normal',
                phrases: [
                  {
                    type: 'text',
                    value: 'This Phrase "',
                  },
                  {
                    type: 'custom',
                    value: 'Click to say hello',
                    metadata: {
                      popMsg: '👋 hello',
                    },
                    styles: {
                      cursor: 'pointer',
                    },
                  },
                  {
                    type: 'text',
                    value: '" is a custom phrase',
                  },
                ],
              },
              {
                customType: 'markdown',
                value: markdown,
              },
            ],
          }}
          customPhraseRender={clickTagRender}
          customBlockElementRender={markdownBlockRender}
        />
        <HighlightCode
          langType="tsx"
          code={`
<NarrativeTextVis<ClickTagMeta, PraseMetaData>
  spec={textSpec}
  {...commonProps}
  customPhraseRender={clickTagRender}
  customBlockElementRender={markdownBlockRender}
/>`}
        />
      </ContentBlock>
      <ContentBlock id={anchors[1].id} title={anchors[1].title}>
        <blockquote>
          {'Thanks for '}
          <a
            target="_blank"
            href="https://lexiodemo.narrativescience.com/apps/salesforce-demo/stories/977f56b0-6308-4dc2-bcec-023ee4aa01d0?source=pinned-metrics"
          >
            Lexio Demo
          </a>
        </blockquote>
        <NarrativeTextVis<CustomBlock, ModalShowDetailMeta>
          spec={extendBooking}
          customPhraseRender={modalShowDetailRender}
          customBlockElementRender={markdownBlockRender}
        />
        <HighlightCode
          langType="tsx"
          code={`
<NarrativeTextVis<CustomBlock, PraseMetaData>
  spec={textSpec}
  {...commonProps}
  customPhraseRender={modalShowDetailRender}
  customBlockElementRender={markdownBlockRender}
/>`}
        />
      </ContentBlock>
    </AnchorLayout>
  );
}
