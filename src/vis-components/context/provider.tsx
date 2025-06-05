import { ComponentChildren } from 'preact';
import { PluginManager, presetPluginManager } from '../../plugin';
import { ThemeProps, defaultTheme } from '../../theme';
import { ThemeProvider } from './hooks';
import { PluginProvider } from './hooks';

interface ContextProviderProps {
  plugin?: PluginManager;
  theme?: ThemeProps;
  children: ComponentChildren;
}

/**
 * The ContextProvider component wraps the application with necessary context providers for plugins and themes.
 */
export const ContextProvider = ({
  plugin = presetPluginManager,
  theme = defaultTheme,
  children,
}: ContextProviderProps) => {
  return (
    <PluginProvider plugin={plugin}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </PluginProvider>
  );
};
