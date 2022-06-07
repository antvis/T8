/**
 * Support customize placeholder
 */
import { withPlaceholders } from '@udecode/plate-ui-placeholder';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

export const withStyledPlaceholders = (components) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: '键入文字或“/”插入数据解读',
      hideOnBlur: true,
    },
  ]);
