/**
 * Support customize placeholder
 */
import { withPlaceholders, ELEMENT_H1, ELEMENT_PARAGRAPH } from '@udecode/plate';

export const withStyledPlaceholders = (components: any) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: '键入文字或“/”插入数据解读',
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Untitled',
      hideOnBlur: false,
    },
  ]);
