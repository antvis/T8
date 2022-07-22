import React from 'react';

import { ConfigContext, DEFAULT_CONTEXT } from './context';

import type { ConfigLocaleProps } from './types';

const ConfigProvider: React.FC<ConfigLocaleProps> = ({ children, ...props }) => {
  const providerProps = { ...DEFAULT_CONTEXT, ...props };

  return <ConfigContext.Provider value={providerProps}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
