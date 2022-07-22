/** Provide hooks for function components to get global configuration */

import { useContext } from 'react';

import { ConfigContext } from './context';

/**
 * Get language information from context
 * */
export const useLocale = () => {
  const { locale } = useContext(ConfigContext);
  return locale;
};