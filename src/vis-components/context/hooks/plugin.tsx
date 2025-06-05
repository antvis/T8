import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/compat';
import { PluginManager, presetPluginManager } from '../../../plugin';

type PluginProviderProps = {
  plugin?: PluginManager;
  children: ComponentChildren;
};

export function PluginProvider({ plugin = presetPluginManager, children }: PluginProviderProps) {
  return <PluginContext.Provider value={plugin}>{children}</PluginContext.Provider>;
}

const PluginContext = createContext<PluginManager>(presetPluginManager);

export function usePluginManager() {
  const pluginManager = useContext(PluginContext);
  return pluginManager;
}
