import { headingComponents } from '../heading';
import { paragraphComponent } from '../paragraph';
import { listComponents } from '../list';
import { basicMarkComponents } from '../marks';

export const createCustomUI = () => ({
  ...headingComponents,
  ...paragraphComponent,
  ...listComponents,
  ...basicMarkComponents,
});

// TODO 调试时使用
// export { createPlateUI as createCustomUI } from '@udecode/plate';
