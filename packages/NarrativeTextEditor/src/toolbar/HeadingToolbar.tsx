import React, { ReactNode, CSSProperties } from 'react';
import { HeadingToolbar as PlateHeadingToolbar } from '@udecode/plate-ui-toolbar';

import {
  HeadingToolbarButtons,
  ParagraphToolbarButton,
  AlignToolbarButtons,
  ListToolbarButtons,
  BasicMarkToolbarButtons,
  FontToolbarButtons,
  LinkToolbarButton,
} from '../plugins';

type ToolbarExtraContentMap = { left?: ReactNode; right?: ReactNode };
export interface HeadingToolbarProps {
  /** Extra content in toolbar */
  toolbarExtraContent?: ReactNode | ToolbarExtraContentMap;
  /** Centers toolbar items */
  centered?: boolean;
  /** toolbar style */
  style?: CSSProperties;
}

const HeadingToolbar: React.FC<HeadingToolbarProps> = ({ toolbarExtraContent, centered, style }) => {
  const extra = parseExtraContent(toolbarExtraContent);
  return (
    <PlateHeadingToolbar
      style={{
        padding: '4px 12px',
        borderBottom: '1px solid #eee',
        margin: '0 0 12px 0',
        ...style,
        justifyContent: centered ? 'center' : undefined,
      }}
    >
      {extra?.left}
      <HeadingToolbarButtons />
      <ParagraphToolbarButton />
      <BasicMarkToolbarButtons />
      <FontToolbarButtons />
      <AlignToolbarButtons />
      <ListToolbarButtons />
      <LinkToolbarButton />
      {extra?.right}
    </PlateHeadingToolbar>
  );
};

export default HeadingToolbar;

function parseExtraContent(extra: HeadingToolbarProps['toolbarExtraContent']): ToolbarExtraContentMap {
  if (!extra) return {};
  if (extra && typeof extra === 'object' && !React.isValidElement(extra)) return extra as ToolbarExtraContentMap;
  return { right: extra };
}
