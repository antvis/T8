import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/compat';
import { defaultSeedToken, SeedTokenOptions } from '../../../theme';

type ThemeProviderProps = {
  children: ComponentChildren;
  themeSeedToken?: SeedTokenOptions;
};

export function ThemeProvider({ themeSeedToken = defaultSeedToken, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={themeSeedToken}>{children}</ThemeContext.Provider>;
}

const ThemeContext = createContext<SeedTokenOptions>(defaultSeedToken);

export function useTheme() {
  const seedToken = useContext(ThemeContext);
  return seedToken;
}
