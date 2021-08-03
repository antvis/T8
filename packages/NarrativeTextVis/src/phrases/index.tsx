import React from 'react';
import { map, get } from 'lodash';
import cx from 'classnames';
import { IPhrase } from '@antv/text-schema';
import { getPrefixCls } from '../utils/getPrefixCls';

interface Props {
  spec: IPhrase[];
}

export const Phrase: React.FC<Props> = ({ spec }) => (
  <>
    {map(spec, (phrase, index) => {
      if (phrase.type === 'text') return phrase.value;
      if (phrase.type === 'entity') {
        const assessment = get(phrase, 'metadata.assessment');
        return (
          <span
            className={cx({
              [getPrefixCls('value')]: get(phrase, 'metadata.entityType', false),
              [getPrefixCls(`value-${assessment}`)]: !!assessment,
            })}
            key={`${phrase.value}-${index}`}
          >
            {phrase.value}
          </span>
        );
      }
      return null;
    })}
  </>
);
