import { useState, useEffect } from 'preact/hooks';
import { PluginManager } from './PluginManager';
import { PluginType } from './plugin-protocol.type';

/**
 * Custom hook for creating and managing a PluginManager instance.
 *
 * This hook ensures that a PluginManager is created only once and properly configured
 * with the provided plugins. It handles two main scenarios:
 * 1. Using an existing PluginManager passed as a prop
 * 2. Creating a new PluginManager when none is provided
 *
 * @param pluginManager - Optional existing PluginManager instance to use
 * @param plugins - Optional array of plugins to register with the PluginManager
 * @returns The configured PluginManager instance or null if not yet initialized
 */
export const usePluginCreator = (pluginManager?: PluginManager, plugins?: PluginType[]) => {
  // State to hold the PluginManager instance
  const [innerPluginManager, setInnerPluginManager] = useState<PluginManager>(null);

  useEffect(() => {
    if (!innerPluginManager) {
      if (pluginManager) {
        // Use the provided pluginManager instance
        setInnerPluginManager(pluginManager);
        // Additional registration
        if (plugins) {
          // Register additional plugins with the existing pluginManager
          innerPluginManager.registerAll(plugins);
        }
      } else {
        // Create a new PluginManager with the provided plugins
        setInnerPluginManager(new PluginManager(plugins));
      }
    }
  }, [pluginManager, plugins]);

  return innerPluginManager;
};
