import { createContext, useContext } from "react";

type Theme = "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "dark",
  setTheme: () => null,
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  // No-op - always dark, no theme switching!
  return (
    <ThemeProviderContext.Provider
      value={{ theme: "dark", setTheme: () => {} }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Custom hook, also always returns dark
export const useTheme = () => {
  return { theme: "dark", setTheme: () => {} };
};
