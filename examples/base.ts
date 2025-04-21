import {
  NarrativeTextSpec,
  Structure,
  StructureTemp,
  Variable,
  ParagraphType,
  PhraseType,
  StructureDisplayType,
} from '../src';

const base = () => {
  const structures: Structure[] = [
    {
      template: 'System &{s1}, includes &{s2}.',
      displayType: StructureDisplayType.PARAGRAPH,
    },
  ];

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

  const result: NarrativeTextSpec = {
    sections: [
      {
        paragraphs: [
          {
            type: ParagraphType.NORMAL,
            phrases: [
              { type: PhraseType.TEXT, value: 'System ' },
              { type: PhraseType.TEXT, value: 'github' },
              { type: PhraseType.TEXT, value: ' includes, ' },
              { type: PhraseType.TEXT, value: 'user ' },
              {
                type: PhraseType.ENTITY,
                value: 'x',
                metadata: { entityType: 'dim_value' },
              },
              { type: PhraseType.TEXT, value: ' ' },
              {
                type: PhraseType.ENTITY,
                value: 'Age',
                metadata: { entityType: 'metric_name' },
              },
              { type: PhraseType.TEXT, value: ' is ' },
              {
                type: PhraseType.ENTITY,
                value: '12',
                metadata: { entityType: 'metric_value' },
              },
              { type: PhraseType.TEXT, value: ', ' },
              { type: PhraseType.TEXT, value: 'user ' },
              {
                type: PhraseType.ENTITY,
                value: 'y',
                metadata: { entityType: 'dim_value' },
              },
              { type: PhraseType.TEXT, value: ' ' },
              {
                type: PhraseType.ENTITY,
                value: 'Age',
                metadata: { entityType: 'metric_name' },
              },
              { type: PhraseType.TEXT, value: ' is ' },
              {
                type: PhraseType.ENTITY,
                value: '18',
                metadata: { entityType: 'metric_value' },
              },
              { type: PhraseType.TEXT, value: '.' },
            ],
          },
          {
            type: ParagraphType.NORMAL,
            phrases: [
              { type: PhraseType.TEXT, value: 'System ' },
              { type: PhraseType.TEXT, value: 'github' },
              { type: PhraseType.TEXT, value: ' includes, ' },
              { type: PhraseType.TEXT, value: 'user ' },
              {
                type: PhraseType.ENTITY,
                value: 'x',
                metadata: { entityType: 'dim_value' },
              },
              { type: PhraseType.TEXT, value: ' ' },
              {
                type: PhraseType.ENTITY,
                value: 'Age',
                metadata: { entityType: 'metric_name' },
              },
              { type: PhraseType.TEXT, value: ' is ' },
              {
                type: PhraseType.ENTITY,
                value: '12',
                metadata: { entityType: 'metric_value' },
              },
              { type: PhraseType.TEXT, value: ', ' },
              { type: PhraseType.TEXT, value: 'user ' },
              {
                type: PhraseType.ENTITY,
                value: 'y',
                metadata: { entityType: 'dim_value' },
              },
              { type: PhraseType.TEXT, value: ' ' },
              {
                type: PhraseType.ENTITY,
                value: 'Age',
                metadata: { entityType: 'metric_name' },
              },
              { type: PhraseType.TEXT, value: ' is ' },
              {
                type: PhraseType.ENTITY,
                value: '18',
                metadata: { entityType: 'metric_value' },
              },
              { type: PhraseType.TEXT, value: '.' },
            ],
          },
        ],
      },
      {
        paragraphs: [
          {
            type: ParagraphType.NORMAL,
            phrases: [
              { type: PhraseType.TEXT, value: 'System ' },
              { type: PhraseType.TEXT, value: 'github' },
              { type: PhraseType.TEXT, value: ' includes, ' },
              { type: PhraseType.TEXT, value: 'user ' },
              {
                type: PhraseType.ENTITY,
                value: 'x',
                metadata: { entityType: 'dim_value' },
              },
              { type: PhraseType.TEXT, value: ' ' },
              {
                type: PhraseType.ENTITY,
                value: 'Age',
                metadata: { entityType: 'metric_name' },
              },
              { type: PhraseType.TEXT, value: ' is ' },
              {
                type: PhraseType.ENTITY,
                value: '12',
                metadata: { entityType: 'metric_value' },
              },
              { type: PhraseType.TEXT, value: ', ' },
              { type: PhraseType.TEXT, value: 'user ' },
              {
                type: PhraseType.ENTITY,
                value: 'y',
                metadata: { entityType: 'dim_value' },
              },
              { type: PhraseType.TEXT, value: ' ' },
              {
                type: PhraseType.ENTITY,
                value: 'Age',
                metadata: { entityType: 'metric_name' },
              },
              { type: PhraseType.TEXT, value: ' is ' },
              {
                type: PhraseType.ENTITY,
                value: '18',
                metadata: { entityType: 'metric_value' },
              },
              { type: PhraseType.TEXT, value: '.' },
            ],
          },
        ],
      },
    ],
  };

  return {
    result,
    structures,
    structureTemps,
    variables,
  };
};

export default base;
