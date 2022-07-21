/** 提供函数组件获取全局配置的 hook */

import { useContext } from 'react';

import { ConfigContext } from './context';

/**
 * 从上下文中获取国际化信息
 * */
export const useLocale = () => {
  const { locale } = useContext(ConfigContext);
  return locale;
};