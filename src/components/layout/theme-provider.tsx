"use client";

import { createContext, useContext } from "react";

interface ThemeContextValue {
  theme: "dark";
  resolvedTheme: "dark";
  setTheme: (theme: "dark") => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => undefined,
  toggleTheme: () => undefined,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: () => undefined,
      toggleTheme: () => undefined,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
