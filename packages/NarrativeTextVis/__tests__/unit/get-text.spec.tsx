import { ITextSpec } from '@antv/narrative-text-schema';
import { getNarrativeText } from '../../src/tools/getText';

describe('get text', () => {
  it('basic narrative', () => {
    const spec: ITextSpec = {
      headline: {
        type: 'headline',
        phrases: [{ type: 'text', value: 'Heading' }],
      },
      sections: [
        {
          paragraphs: [
            {
              type: 'normal',
              phrases: [
                { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
                { type: 'text', value: ' is ' },
                { type: 'entity', value: '1.23', metadata: { entityType: 'metric_value' } },
              ],
            },
          ],
        },
      ],
    };
    expect(getNarrativeText(spec)).toEqual(`Heading\r\n\r\nDAU is 1.23`);
  });

  it('narrative including custom phrase', () => {
    const spec: ITextSpec<null, { text: string }> = {
      sections: [
        {
          paragraphs: [
            {
              type: 'normal',
              phrases: [
                { type: 'entity', value: 'DAU', metadata: { entityType: 'metric_name' } },
                { type: 'text', value: ' is ' },
                { type: 'entity', value: '1.23', metadata: { entityType: 'metric_value' } },
                { type: 'text', value: '. ' },
                { type: 'custom', value: 'xxx', metadata: { text: 'yyy' } },
              ],
            },
          ],
        },
      ],
    };
    expect(getNarrativeText(spec)).toEqual(`\r\nDAU is 1.23. xxx`);
    expect(getNarrativeText<null, { text: string }>(spec, false, null, (spec) => 'mmm')).toEqual(
      `\r\nDAU is 1.23. mmm`,
    );
    expect(
      getNarrativeText<null, { text: string }>(spec, false, null, (spec) => {
        if (spec.type === 'custom') return spec.metadata.text;
      }),
    ).toEqual(`\r\nDAU is 1.23. yyy`);
  });
});
