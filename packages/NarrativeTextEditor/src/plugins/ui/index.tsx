import { headingComponents } from '../heading';
import { paragraphComponent } from '../paragraph';
import { listComponents } from '../list';

export const createCustomUI = () => ({
  ...headingComponents,
  ...paragraphComponent,
  ...listComponents,
});

// TODO 调试时使用
// export { createPlateUI as createCustomUI } from '@udecode/plate';
