import { generateTextSpec } from '../../src';
import type { Structure, StructureTemp, Variable, NarrativeTextSpec } from '../../src';

// return: System github, includes user x Age 12, user y Age 18.
const structures: Structure[] = [{ template: 'System &{s1} includes, &{s2}.', displayType: 'paragraph' }];

const structureTemps: StructureTemp[] = [
  { templateId: 's1', template: '${systemName}', variableId: 'var2' },
  {
    templateId: 's2',
    template: 'user ${name} ${age[metric_name]} is ${age}',
    variableId: 'var1',
    separator: ', ',
  },
];

const variables: Variable[] = [
  {
    variableId: 'var1',
    dataValue: [
      { name: 'x', age: 12 },
      { name: 'y', age: 18 },
    ],
    dataMetaMap: {
      name: { entityType: 'dim_value', name: 'Name' },
      age: { entityType: 'metric_value', name: 'Age' },
    },
  },
  {
    variableId: 'var2',
    // can used for constants
    dataValue: { systemName: 'github' },
  },
];

describe('generate sentence by template and data', () => {
  test('constants with array, and fieldId', () => {
    const result: NarrativeTextSpec = {
      sections: [
        {
          paragraphs: [
            {
              type: 'normal',
              phrases: [
                { type: 'text', value: 'System ' },
                { type: 'text', value: 'github' },
                { type: 'text', value: ' includes, ' },
                { type: 'text', value: 'user ' },
                { type: 'entity', value: 'x', metadata: { entityType: 'dim_value' } },
                { type: 'text', value: ' ' },
                { type: 'entity', value: 'Age', metadata: { entityType: 'metric_name' } },
                { type: 'text', value: ' is ' },
                { type: 'entity', value: '12', metadata: { entityType: 'metric_value' } },
                { type: 'text', value: ', ' },
                { type: 'text', value: 'user ' },
                { type: 'entity', value: 'y', metadata: { entityType: 'dim_value' } },
                { type: 'text', value: ' ' },
                { type: 'entity', value: 'Age', metadata: { entityType: 'metric_name' } },
                { type: 'text', value: ' is ' },
                { type: 'entity', value: '18', metadata: { entityType: 'metric_value' } },
                { type: 'text', value: '.' },
              ],
            },
          ],
        },
      ],
    };

    expect(generateTextSpec({ structures, structureTemps, variables })).toEqual(result);
  });
});
