import { ComponentChildren } from 'preact';
import { PluginManager, presetPluginManager } from '../../plugin';
import { SeedTokenOptions, defaultSeedToken } from '../../theme';
import { ThemeProvider, PluginProvider, EventProvider } from './hooks';
import { NarrativeEvents } from '../types';

interface ContextProviderProps {
  plugin?: PluginManager;
  themeSeedToken?: SeedTokenOptions;
  events?: NarrativeEvents;
  children: ComponentChildren;
}

/**
 * The ContextProvider component wraps the application with necessary context providers for plugins and themes.
 */
export const ContextProvider = ({
  plugin = presetPluginManager,
  themeSeedToken = defaultSeedToken,
  events = {},
  children,
}: ContextProviderProps) => {
  return (
    <PluginProvider plugin={plugin}>
      <ThemeProvider themeSeedToken={themeSeedToken}>
        <EventProvider events={events}>{children}</EventProvider>
      </ThemeProvider>
    </PluginProvider>
  );
};
