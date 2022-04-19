/**
 * Includes the following plugins:
 *
 * Font background color
 * Font color
 * Font family, Currently not supported
 * Font size
 * Font weight
 */
import React from 'react';
import {
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
  createFontWeightPlugin,
  MARK_COLOR,
  MARK_BG_COLOR,
} from '@udecode/plate-font';
import { ColorPickerToolbarDropdown } from '@udecode/plate-ui-font';
import { FontColorsOutlined, BgColorsOutlined } from '@ant-design/icons';

export const fontPlugins = [
  createFontColorPlugin(),
  createFontBackgroundColorPlugin(),
  createFontSizePlugin(),
  createFontWeightPlugin(),
];

export const FontToolbarButtons = () => (
  <>
    <ColorPickerToolbarDropdown
      pluginKey={MARK_COLOR}
      icon={<FontColorsOutlined />}
      selectedIcon={null}
      tooltip={{ content: 'Text color' }}
    />
    <ColorPickerToolbarDropdown
      pluginKey={MARK_BG_COLOR}
      icon={<BgColorsOutlined />}
      selectedIcon={null}
      tooltip={{ content: 'Highlight color' }}
    />
  </>
);
