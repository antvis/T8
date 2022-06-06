import { headingComponents } from '../heading';
import { paragraphComponent } from '../paragraph';
import { listComponents } from '../list';
import { basicMarkComponents } from '../marks';
// import { variableComponents } from '../variable';

export const createCustomUI = () => ({
  ...headingComponents,
  ...paragraphComponent,
  ...listComponents,
  ...basicMarkComponents,
  // ...variableComponents,
});
