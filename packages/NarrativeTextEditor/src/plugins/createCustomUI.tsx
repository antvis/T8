import { PlatePluginComponent } from '@udecode/plate-core';

import { headingComponents } from './heading';
import { paragraphComponent } from './paragraph';
import { listComponents } from './list';
import { basicMarkComponents } from './marks';
import { customBlockElementWrapper, customInlineElementWrapper, CustomPlugin } from './custom';

export const createCustomUI = (extraPlugin: CustomPlugin[] = []): Record<string, PlatePluginComponent<any>> => {
  const extraComps: Record<string, PlatePluginComponent<any>> = {};
  extraPlugin.forEach(({ key, isInline, component: Component }) => {
    extraComps[key] = isInline ? customInlineElementWrapper(Component) : customBlockElementWrapper(Component);
  });
  return {
    ...headingComponents,
    ...paragraphComponent,
    ...listComponents,
    ...basicMarkComponents,
    ...extraComps,
  };
};
