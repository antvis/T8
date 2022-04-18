import { useState, useMemo } from 'react';
import { Radio, Tag, message, Form } from 'antd';
import { UpCircleFilled, DownCircleFilled } from '@ant-design/icons';
import {
  NarrativeTextVis,
  Section,
  NarrativeTextSpec,
  CustomPhraseSpec,
  DefaultBlockStructure as S,
  NarrativeTextVisProps,
  Phrase,
  PhraseSpec,
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
  'custom phrase encoding',
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

const clickTagRender = (phrase: CustomPhraseSpec<ClickTagMeta>) => (
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

const modalShowDetailRender = (
  phrase: CustomPhraseSpec<ModalShowDetailMeta>,
) => {
  if (
    phrase.metadata?.interaction === 'click' &&
    phrase.metadata?.show === 'modal'
  ) {
    return <ModalShowDetail phrase={phrase} />;
  }
  return null;
};

type CustomNarrative = NarrativeTextSpec<CustomBlock, ModalShowDetailMeta>;

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

const ratio_up: PhraseSpec = {
  type: 'entity',
  value: '10%',
  metadata: {
    entityType: 'ratio_value',
    assessment: 'positive',
  },
};

const ratio_down: PhraseSpec = {
  type: 'entity',
  value: '10%',
  metadata: {
    entityType: 'ratio_value',
    assessment: 'negative',
  },
};

const delta_up: PhraseSpec = {
  type: 'entity',
  value: '20.23',
  metadata: {
    entityType: 'delta_value',
    assessment: 'positive',
  },
};

const delta_down: PhraseSpec = {
  type: 'entity',
  value: '20.23',
  metadata: {
    entityType: 'delta_value',
    assessment: 'negative',
  },
};

const greenColor = '#30bf78';
const redColor = '#f4664a';

export default function CustomPage() {
  const [color, setColor] = useState<'red_up_green_down' | 'red_down_green_up'>(
    'red_up_green_down',
  );
  const [deltaFlag, setDeltaFlag] = useState<'delta_+_-' | 'delta_up_down'>(
    'delta_+_-',
  );

  const customEntityEncoding: NarrativeTextVisProps['customEntityEncoding'] =
    useMemo(() => {
      return {
        ratio_value: {
          assessment: {
            positive: {
              color: color === 'red_up_green_down' ? redColor : greenColor,
            },
            negative: {
              color: color === 'red_up_green_down' ? greenColor : redColor,
            },
          },
        },
        delta_value: {
          assessment: {
            positive: {
              color: color === 'red_up_green_down' ? redColor : greenColor,
              prefix: deltaFlag === 'delta_+_-' ? '+' : <UpCircleFilled />,
            },
            negative: {
              color: color === 'red_up_green_down' ? greenColor : redColor,
              prefix: deltaFlag === 'delta_+_-' ? '-' : <DownCircleFilled />,
            },
          },
        },
      };
    }, [color, deltaFlag]);

  return (
    <AnchorLayout anchorLinks={anchors}>
      <ContentBlock id={anchors[0].id} title={anchors[0].title}>
        <Form>
          <Form.Item label="derived value color encoding">
            <Radio.Group
              onChange={(e) => setColor(e.target.value)}
              value={color}
            >
              <Radio value="red_up_green_down">
                <Phrase spec={ratio_up} />
                <Phrase spec={ratio_down} />
              </Radio>
              <Radio value="red_down_green_up">
                <Phrase
                  spec={ratio_up}
                  customEntityEncoding={{
                    ratio_value: {
                      assessment: {
                        positive: {
                          color: greenColor,
                        },
                        negative: {
                          color: redColor,
                        },
                      },
                    },
                  }}
                />
                <Phrase
                  spec={ratio_down}
                  customEntityEncoding={{
                    ratio_value: {
                      assessment: {
                        positive: {
                          color: greenColor,
                        },
                        negative: {
                          color: redColor,
                        },
                      },
                    },
                  }}
                />
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="delta value assessment flag">
            <Radio.Group
              value={deltaFlag}
              onChange={(e) => setDeltaFlag(e.target.value)}
            >
              <Radio value="delta_+_-">
                <Phrase spec={delta_up} />
                <Phrase spec={delta_down} />
              </Radio>
              <Radio value="delta_up_down">
                <Phrase
                  spec={delta_up}
                  customEntityEncoding={{
                    delta_value: {
                      assessment: {
                        positive: {
                          prefix: <UpCircleFilled />,
                        },
                        negative: {
                          prefix: <DownCircleFilled />,
                        },
                      },
                    },
                  }}
                />
                <Phrase
                  spec={delta_down}
                  customEntityEncoding={{
                    delta_value: {
                      assessment: {
                        positive: {
                          prefix: <UpCircleFilled />,
                        },
                        negative: {
                          prefix: <DownCircleFilled />,
                        },
                      },
                    },
                  }}
                />
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>

        <NarrativeTextVis
          spec={booking as NarrativeTextSpec}
          customEntityEncoding={customEntityEncoding}
        />
        <HighlightCode
          langType="tsx"
          code={`
type CustomEntityEncoding = Partial<Record<EntityType, EncodingChannels>>;

<NarrativeTextVis
  spec={textSpec}
  customEntityEncoding={CustomEntityEncoding}
/>`}
        />
      </ContentBlock>
      <ContentBlock id={anchors[1].id} title={anchors[1].title}>
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
<Section<ClickTagMeta, PraseMetaData>
  spec={textSpec}
  customPhraseRender={clickTagRender}
  customBlockElementRender={markdownBlockRender}
/>`}
        />
      </ContentBlock>
      <ContentBlock id={anchors[2].id} title={anchors[2].title}>
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
  customPhraseRender={modalShowDetailRender}
  customBlockElementRender={markdownBlockRender}
/>`}
        />
      </ContentBlock>
    </AnchorLayout>
  );
}
