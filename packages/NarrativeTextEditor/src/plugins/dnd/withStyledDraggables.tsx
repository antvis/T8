import React from 'react';
import { DragIndicator } from '@styled-icons/material-outlined/DragIndicator';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { withDraggables } from '@udecode/plate-ui-dnd';
import styled, { css } from 'styled-components';

export const withStyledDraggables = (components, extraKeys: string[] = []) => {
  return withDraggables(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0,
    },
    {
      keys: [
        ELEMENT_PARAGRAPH,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_OL,
        ELEMENT_UL,
        ...extraKeys,
      ],
      onRenderDragHandle: ({ className, styles }) => {
        const Button = styled.button`
          ${styles}
          overflow: visible;
          margin-right: 2px;
        `;
        return (
          <Button className={className}>
            <DragIndicator
              style={{
                width: 18,
                height: 18,
                color: 'rgba(55, 53, 47, 0.3)',
              }}
            />
          </Button>
        );
      },
    },
    {
      key: ELEMENT_H1,
      styles: {
        gutterLeft: css`
          padding-top: 28px;
        `,
      },
    },
    {
      key: ELEMENT_H2,
      styles: {
        gutterLeft: css`
          padding-top: 21px;
        `,
      },
    },
    {
      key: ELEMENT_H3,
      styles: {
        gutterLeft: css`
          padding-top: 16px;
        `,
      },
    },
    {
      keys: [ELEMENT_H4, ELEMENT_H5],
      styles: {
        gutterLeft: css`
          padding-top: 6px;
        `,
      },
    },
    {
      keys: [ELEMENT_H6],
      styles: {
        gutterLeft: css`
          margin-top: -2px;
        `,
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      styles: {
        gutterLeft: css`
          height: auto;
          margin-top: -2px;
        `,
      },
    },
  ]);
};
