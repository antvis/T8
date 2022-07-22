import { createContext } from 'react';

import zhCN from '../../locale/zh_CN';

import type { ConfigLocaleProps } from './types';

export const DEFAULT_CONTEXT = {
  // Default Language: Chinese
  locale: zhCN,
};

export const ConfigContext = createContext<ConfigLocaleProps>(DEFAULT_CONTEXT);
