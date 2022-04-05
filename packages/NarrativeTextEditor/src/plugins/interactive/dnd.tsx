import React from 'react';
import { DragIndicator } from '@styled-icons/material/DragIndicator';
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  grabberTooltipProps,
  withDraggables,
  createDndPlugin,
} from '@udecode/plate';
import { Tooltip } from 'antd';
import { css } from 'styled-components';
import tw from 'twin.macro';

export const dndPlugin = createDndPlugin();

export const withStyledDraggables = (components: any) =>
  withDraggables(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0,
    },
    {
      keys: [
        ELEMENT_PARAGRAPH,
        ELEMENT_BLOCKQUOTE,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_IMAGE,
        ELEMENT_OL,
        ELEMENT_UL,
        ELEMENT_CODE_BLOCK,
      ],
      onRenderDragHandle: ({ styles, ...props }) => (
        <Tooltip overlay={grabberTooltipProps.content}>
          {/* TODO styles[0] 当前是一个临时方案，待明确 cssInJs 整体方案之后再调整  */}
          <button type="button" {...props} style={styles[0]}>
            <DragIndicator
              style={{
                width: 18,
                height: 18,
                color: 'rgba(55, 53, 47, 0.3)',
              }}
            />
          </button>
        </Tooltip>
      ),
    },
    {
      key: ELEMENT_H1,
      styles: {
        gutterLeft: css`
          padding: 2em 0 4px;
          font-size: 1.875em;
        `,
        blockToolbarWrapper: tw`height[1.3em]`,
      },
    },
    {
      key: ELEMENT_H2,
      styles: {
        gutterLeft: css`
          padding: 1.4em 0 1px;
          font-size: 1.5em;
        `,
        blockToolbarWrapper: tw`height[1.3em]`,
      },
    },
    {
      key: ELEMENT_H3,
      styles: {
        gutterLeft: css`
          padding: 1em 0 1px;
          font-size: 1.25em;
        `,
        blockToolbarWrapper: tw`height[1.3em]`,
      },
    },
    {
      keys: [ELEMENT_H4, ELEMENT_H5, ELEMENT_H6],
      styles: {
        gutterLeft: css`
          padding: 0.75em 0 0;
          font-size: 1.1em;
        `,
        blockToolbarWrapper: tw`height[1.3em]`,
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      styles: {
        gutterLeft: tw`pt-1`,
      },
    },
    {
      key: ELEMENT_BLOCKQUOTE,
      styles: {
        gutterLeft: tw`paddingTop[18px]`,
      },
    },
    {
      key: ELEMENT_CODE_BLOCK,
      styles: {
        gutterLeft: tw`pt-3`,
      },
    },
  ]);
