import {
  NarrativeTextVis,
  Section,
  Paragraph,
  INarrativeTextSpec,
} from '@antv/narrative-text-vis';

import AnchorLayout from '../components/AnchorLayout';
import ContentBlock from '../components/ContentBlock';
import Design from '../components/Design';
import HighlightCode from '../components/HighlightCode';
import getAnchors from '../utils/get-anchors';
import booking from '../data/booking.json';

const anchors = getAnchors('basic', [
  'phrase',
  'paragraph',
  'section',
  'narrative',
]);

export default function BasicPage() {
  return (
    <AnchorLayout anchorLinks={anchors}>
      <ContentBlock id={anchors[0].id} title={anchors[0].title}>
        <Design />
        <HighlightCode langType="tsx" code={`<Phrase spec={phraseSpec} />`} />
      </ContentBlock>
      <ContentBlock id={anchors[1].id} title={anchors[1].title}>
        <Paragraph
          spec={{
            type: 'normal',
            phrases: [
              { type: 'text', value: 'This is a single paragraph example.' },
            ],
          }}
        />
        <HighlightCode
          langType="tsx"
          code={`<Paragraph spec={paragraphSpec} />`}
        />
      </ContentBlock>
      <ContentBlock id={anchors[2].id} title={anchors[2].title}>
        <Section
          spec={{
            paragraphs: [
              {
                type: 'normal',
                phrases: [{ type: 'text', value: 'Normal Paragraph' }],
              },
              {
                type: 'bullets',
                isOrder: false,
                bullets: [
                  {
                    type: 'bullet-item',
                    phrases: [{ type: 'text', value: 'Bullet one' }],
                  },
                  {
                    type: 'bullet-item',
                    phrases: [{ type: 'text', value: 'Bullet two' }],
                  },
                ],
              },
            ],
          }}
        />
        <HighlightCode langType="tsx" code={`<Section spec={sectionSpec} />`} />
      </ContentBlock>
      <ContentBlock id={anchors[3].id} title={anchors[3].title}>
        <blockquote>
          {'Thanks for '}
          <a
            target="_blank"
            href="https://lexiodemo.narrativescience.com/apps/salesforce-demo/stories/977f56b0-6308-4dc2-bcec-023ee4aa01d0?source=pinned-metrics"
          >
            Lexio Demo
          </a>
        </blockquote>
        <NarrativeTextVis spec={booking as INarrativeTextSpec} />
        <HighlightCode
          langType="tsx"
          code={`<NarrativeTextVis spec={textSpec} />`}
        />
      </ContentBlock>
    </AnchorLayout>
  );
}
