import React, { ReactNode } from 'react';
import { HeadingToolbar as PlateHeadingToolbar } from '@udecode/plate-ui-toolbar';

import {
  HeadingToolbarButtons,
  ParagraphToolbarButton,
  AlignToolbarButtons,
  ListToolbarButtons,
  BasicMarkToolbarButtons,
  FontToolbarButtons,
} from '../plugins';

type ToolbarExtraContentMap = { left?: ReactNode; right?: ReactNode };
export interface HeadingToolbarProps {
  /** Extra content in toolbar */
  toolbarExtraContent?: ReactNode | ToolbarExtraContentMap;
  /** Centers toolbar items */
  centered?: boolean;
}

const HeadingToolbar: React.FC<HeadingToolbarProps> = ({ toolbarExtraContent, centered }) => {
  const extra = parseExtraContent(toolbarExtraContent);
  return (
    <PlateHeadingToolbar
      style={{
        padding: '4px 12px',
        marginBottom: 12,
        borderBottom: '1px solid #eee',
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
