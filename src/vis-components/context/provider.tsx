import { ComponentChildren } from 'preact';
import { PluginManager, presetPluginManager } from '../../plugin';
import { SeedTokenOptions, defaultSeedToken } from '../../theme';
import { ThemeProvider } from './hooks';
import { PluginProvider } from './hooks';

interface ContextProviderProps {
  plugin?: PluginManager;
  themeSeedToken?: SeedTokenOptions;
  children: ComponentChildren;
}

/**
 * The ContextProvider component wraps the application with necessary context providers for plugins and themes.
 */
export const ContextProvider = ({
  plugin = presetPluginManager,
  themeSeedToken = defaultSeedToken,
  children,
}: ContextProviderProps) => {
  return (
    <PluginProvider plugin={plugin}>
      <ThemeProvider themeSeedToken={themeSeedToken}>{children}</ThemeProvider>
    </PluginProvider>
  );
};
