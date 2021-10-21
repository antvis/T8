import { generateSentence } from '../../src';

describe('generate sentence by template and data', () => {
  test('pure text', () => {
    expect(generateSentence(`This is a pure text sentence.`)).toEqual([
      {
        type: 'text',
        value: 'This is a pure text sentence.',
      },
    ]);
  });

  test('with variable, no data', () => {
    expect(generateSentence(`<%= a %> = <%= b %>`)).toEqual([
      {
        type: 'text',
        value: '<%= a %>',
      },
      {
        type: 'text',
        value: ' = ',
      },
      {
        type: 'text',
        value: '<%= b %>',
      },
    ]);
  });

  test('with variable, empty string', () => {
    expect(generateSentence(`<%= a %> = <%= b %>`, { a: '', b: 'b-val' })).toEqual([
      {
        type: 'text',
        value: '',
      },
      {
        type: 'text',
        value: ' = ',
      },
      {
        type: 'text',
        value: 'b-val',
      },
    ]);
  });

  test('with variable and data', () => {
    expect(generateSentence(`<%= a %> = <%= b %>`, { a: 'DAU', b: '100.123' })).toEqual([
      {
        type: 'text',
        value: 'DAU',
      },
      {
        type: 'text',
        value: ' = ',
      },
      {
        type: 'text',
        value: '100.123',
      },
    ]);
  });

  test('with variable type and data', () => {
    expect(generateSentence(`<%= a$$metric_name$$ %> = <%= b$$metric_value$$ %>`, { a: 'DAU', b: '100.123' })).toEqual([
      {
        type: 'entity',
        value: 'DAU',
        metadata: {
          entityType: 'metric_name',
        },
      },
      {
        type: 'text',
        value: ' = ',
      },
      {
        type: 'entity',
        value: '100.123',
        metadata: {
          entityType: 'metric_value',
        },
      },
    ]);
  });

  test('with original data', () => {
    expect(
      generateSentence(
        `<%= a$$metric_name$$ %> = <%= b$$metric_value$$ %>, delta value is <%= d$$delta_value$$ %>`,
        { a: 'DAU', b: '100.123', d: '12' },
        { a: 'DAU', b: 100.123, d: 123 },
      ),
    ).toEqual([
      {
        type: 'entity',
        value: 'DAU',
        metadata: {
          entityType: 'metric_name',
        },
      },
      {
        type: 'text',
        value: ' = ',
      },
      {
        type: 'entity',
        value: '100.123',
        metadata: {
          entityType: 'metric_value',
        },
      },
      {
        type: 'text',
        value: ', delta value is ',
      },
      {
        type: 'entity',
        value: '12',
        metadata: {
          entityType: 'delta_value',
          assessment: 'positive',
        },
      },
    ]);
  });

  test('without original data', () => {
    expect(
      generateSentence(`<%= a$$metric_name$$ %> = <%= b$$metric_value$$ %>, delta value is <%= d$$delta_value$$ %>`, {
        a: 'DAU',
        b: '100.123',
        d: '12',
      }),
    ).toEqual([
      {
        type: 'entity',
        value: 'DAU',
        metadata: {
          entityType: 'metric_name',
        },
      },
      {
        type: 'text',
        value: ' = ',
      },
      {
        type: 'entity',
        value: '100.123',
        metadata: {
          entityType: 'metric_value',
        },
      },
      {
        type: 'text',
        value: ', delta value is ',
      },
      {
        type: 'entity',
        value: '12',
        metadata: {
          entityType: 'delta_value',
        },
      },
    ]);
  });

  test('without original data', () => {
    expect(
      generateSentence(`<%= a$$metric_name$$ %> = <%= b$$metric_value$$ %>, delta value is <%= d$$delta_value$$ %>`, {
        a: 'DAU',
        b: '100.123',
        d: '12',
      }),
    ).toEqual([
      {
        type: 'entity',
        value: 'DAU',
        metadata: {
          entityType: 'metric_name',
        },
      },
      {
        type: 'text',
        value: ' = ',
      },
      {
        type: 'entity',
        value: '100.123',
        metadata: {
          entityType: 'metric_value',
        },
      },
      {
        type: 'text',
        value: ', delta value is ',
      },
      {
        type: 'entity',
        value: '12',
        metadata: {
          entityType: 'delta_value',
        },
      },
    ]);
  });
});
