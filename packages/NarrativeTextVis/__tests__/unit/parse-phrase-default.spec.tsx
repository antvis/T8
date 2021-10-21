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

  it('metric_value', () => {
    const { classNames, encodingStyles, Content } = new PhraseParser({
      type: 'entity',
      value: '10.23',
      metadata: {
        entityType: 'metric_value',
      },
    });
    expect(classNames).toEqual([getPrefixCls('value'), getPrefixCls('metric-value')]);
    expect(encodingStyles).toEqual({});
    const wrapper = shallow(<span>{Content}</span>);
    expect(wrapper.html()).toEqual('<span>10.23</span>');
    wrapper.unmount();
  });

  it('contribute_ratio', () => {
    const { classNames, encodingStyles, Content } = new PhraseParser({
      type: 'entity',
      value: '10.23%',
      metadata: {
        entityType: 'contribute_ratio',
      },
    });
    expect(classNames).toEqual([getPrefixCls('value'), getPrefixCls('contribute-ratio')]);
    expect(encodingStyles).toEqual({});
    const wrapper = shallow(<span>{Content}</span>);
    expect(wrapper.html()).toEqual('<span>10.23%</span>');
    wrapper.unmount();
  });

  it('ratio_value', () => {
    const { classNames, encodingStyles, Content } = new PhraseParser({
      type: 'entity',
      value: '10.23%',
      metadata: {
        entityType: 'ratio_value',
        assessment: 'positive',
      },
    });
    expect(classNames).toEqual([getPrefixCls('value'), getPrefixCls('ratio-value'), getPrefixCls('value-positive')]);
    expect(encodingStyles).toEqual({});
    const wrapper = shallow(<span>{Content}</span>);
    // expect(wrapper.html()).toEqual('<span>10.23%</span>');
    wrapper.unmount();
  });
});
