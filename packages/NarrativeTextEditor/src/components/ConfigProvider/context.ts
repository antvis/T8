import { createContext } from 'react';

import enUS from '../../locale/en_US';

import type { ConfigLocaleProps } from './types';

export const DEFAULT_CONTEXT = {
  // Default Language: English
  locale: enUS,
};

export const ConfigContext = createContext<ConfigLocaleProps>(DEFAULT_CONTEXT);
