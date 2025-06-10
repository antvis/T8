import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/compat';
import { ThemeProps, defaultTheme } from '../../../theme';

type ThemeProviderProps = {
  theme?: ThemeProps;
  children: ComponentChildren;
};

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

const ThemeContext = createContext<ThemeProps>(defaultTheme);

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}
