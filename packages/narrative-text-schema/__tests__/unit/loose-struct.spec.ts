import { looseNarrative2StrictNarrative, LooseNarrativeTextSpec } from '../../src';

const looseSpec: LooseNarrativeTextSpec = {
  headline: {
    type: 'headline',
    phrases: [
      {
        type: 'text',
        value: 'Headline',
      },
    ],
  },
  sections: [
    {
      paragraphs: [
        {
          type: 'heading2',
          phrases: [{ type: 'text', value: 'Heading2' }],
        },
        {
          type: 'normal',
          phrases: [
            { type: 'text', bold: true },
            { type: 'metric_name', value: 'DAU' },
            { type: 'metric_value', value: '1k', metadata: { detail: 1000 } },
            { type: 'ratio_value', value: '20%', metadata: { detail: 0.2, assessment: 'positive' } },
            {
              type: 'filter',
              metadata: {
                range: [1, 20],
              },
            },
          ],
        },
        {
          type: 'plot',
          metadata: {
            chartType: 'pie',
          },
        },
      ],
    },
    {
      type: 'plot',
      metadata: {
        chartType: 'line',
      },
    },
  ],
};

describe('transfer loose spec to struct spec', () => {
  test('loose type', () => {
    expect(looseNarrative2StrictNarrative(looseSpec)).toEqual({
      headline: {
        type: 'headline',
        phrases: [
          {
            type: 'text',
            value: 'Headline',
          },
        ],
      },
      sections: [
        {
          paragraphs: [
            {
              type: 'heading2',
              phrases: [{ type: 'text', value: 'Heading2' }],
            },
            {
              type: 'normal',
              phrases: [
                { type: 'text', bold: true },
                { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
                { type: 'entity', value: '1k', metadata: { entityType: 'metric_value', detail: 1000 } },
                {
                  type: 'entity',
                  value: '20%',
                  metadata: { entityType: 'ratio_value', detail: 0.2, assessment: 'positive' },
                },
                {
                  type: 'custom',
                  metadata: {
                    customType: 'filter',
                    range: [1, 20],
                  },
                },
              ],
            },
            {
              customType: 'plot',
              metadata: {
                chartType: 'pie',
              },
            },
          ],
        },
        {
          customType: 'plot',
          metadata: {
            chartType: 'line',
          },
        },
      ],
    });
  });
});
