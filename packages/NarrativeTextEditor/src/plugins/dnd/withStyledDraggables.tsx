import React from 'react';
import { DragIndicator } from '@styled-icons/material-outlined/DragIndicator';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { withDraggables } from '@udecode/plate-ui-dnd';
import { css } from 'styled-components';

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
      onRenderDragHandle: () => {
        return (
          <DragIndicator
            style={{
              width: 18,
              height: 18,
              color: 'rgba(55, 53, 47, 0.3)',
              cursor: 'pointer',
            }}
          />
        );
      },
    },
    {
      key: ELEMENT_H1,
      styles: {
        gutterLeft: css`
          padding: 2em 0 4px;
          font-size: 1.875em;
        `,
        blockToolbarWrapper: {
          marginTop: -26,
        },
      },
    },
    {
      key: ELEMENT_H2,
      styles: {
        gutterLeft: css`
          padding: 1.4em 0 1px;
          font-size: 1.5em;
        `,
        blockToolbarWrapper: {
          marginTop: -8,
        },
      },
    },
    {
      key: ELEMENT_H3,
      styles: {
        gutterLeft: css`
          padding: 1em 0 1px;
          font-size: 1.25em;
        `,
        blockToolbarWrapper: {
          marginTop: -2,
        },
      },
    },
    {
      keys: [ELEMENT_H4, ELEMENT_H5],
      styles: {
        gutterLeft: css`
          padding: 0.75em 0 0;
          font-size: 1.1em;
        `,
      },
    },
    {
      keys: [ELEMENT_H6],
      styles: {
        gutterLeft: css`
          padding: 0.75em 0 0;
          font-size: 1.1em;
        `,
        blockToolbarWrapper: {
          marginTop: -12,
        },
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      styles: {
        gutterLeft: {
          marginTop: -12,
        },
        blockToolbarWrapper: {
          marginTop: 12,
        },
      },
    },
  ]);
};
