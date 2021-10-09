import React from 'react';
import { shallow } from 'enzyme';
import PhraseParser from '../../src/utils/phrase-parser';
import { getPrefixCls } from '../../src/utils/getPrefixCls';

describe('phrase handler', () => {
  it('text', () => {
    const { classNames, encodingStyles, Content } = new PhraseParser({
      type: 'text',
      value: 'value',
    });
    expect(classNames).toEqual([]);
    expect(encodingStyles).toEqual({});
    const wrapper = shallow(<span>{Content}</span>);
    expect(wrapper.html()).toEqual('<span>value</span>');
    wrapper.unmount();
  });

  it('metric_name', () => {
    const { classNames, encodingStyles, Content } = new PhraseParser({
      type: 'entity',
      value: 'DAU',
      metadata: {
        entityType: 'metric_name',
      },
    });
    expect(classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-name')]);
    expect(encodingStyles).toEqual({});
    const wrapper = shallow(<span>{Content}</span>);
    expect(wrapper.html()).toEqual('<span>DAU</span>');
    wrapper.unmount();
  });
});
