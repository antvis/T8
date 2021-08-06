/* eslint-disable no-nested-ternary */
import React from 'react';
import { map, get } from 'lodash';
import cx from 'classnames';
import { IPhrase } from '@antv/text-schema';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { parsePhrase } from '../utils/phrase-parser';

interface Props {
  spec: IPhrase[];
}

export const Phrases: React.FC<Props> = ({ spec }) => (
  <>
    {map(spec, (phrase, index) => {
      const pp = parsePhrase(phrase);
      const children = (
        <span className={cx(pp.classNames)} style={phrase?.styles} key={`${phrase.value}-${index}`}>
          {get(phrase, 'metadata.entityType') === 'ratio_value' ? (
            pp.assessment === 'positive' ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )
          ) : null}
          {pp.content}
        </span>
      );
      // TODO interactive of get detail
      return children;
    })}
  </>
);
