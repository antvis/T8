import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { PluginManager, presetPluginManager } from '../../../plugin';
import { SeedTokenOptions, defaultSeedToken } from '../../../theme';
import { NarrativeEvents } from '../../types';

type NarrativeContextValue = {
  plugin: PluginManager;
  themeSeedToken: SeedTokenOptions;
  events: NarrativeEvents;
};

type ContextProviderProps = Partial<NarrativeContextValue> & {
  children: ComponentChildren;
};

const NarrativeContext = createContext<NarrativeContextValue>({
  plugin: presetPluginManager,
  themeSeedToken: defaultSeedToken,
  events: {},
});

/**
 * Single provider for plugin, theme and events.
 */
export function ContextProvider({
  plugin = presetPluginManager,
  themeSeedToken = defaultSeedToken,
  events = {},
  children,
}: ContextProviderProps) {
  return <NarrativeContext.Provider value={{ plugin, themeSeedToken, events }}>{children}</NarrativeContext.Provider>;
}

export const useTheme = () => useContext(NarrativeContext).themeSeedToken;
export const usePluginManager = () => useContext(NarrativeContext).plugin;
export const useEvent = () => useContext(NarrativeContext).events;
