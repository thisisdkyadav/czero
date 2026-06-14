import * as React from "react";
import {
  themeToCssVars,
  cssVarsToString,
  type ThemeOverride,
} from "../../core/tokens";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  /**
   * Optional token overrides applied once for the whole app. Anything you set
   * here overrides the shipped defaults; anything you omit falls back to them.
   * Every component reads these variables, so this is all "theme once" needs.
   */
  theme?: ThemeOverride;
}

const STYLE_ELEMENT_ID = "czero-theme-vars";

/** Inject (or update) a single <style> tag holding the app's token overrides. */
function applyThemeVars(override: ThemeOverride | undefined) {
  if (typeof document === "undefined") return;
  const existing = document.getElementById(STYLE_ELEMENT_ID);

  if (!override || Object.keys(override).length === 0) {
    existing?.remove();
    return;
  }

  const css = cssVarsToString(themeToCssVars(override));
  const style =
    (existing as HTMLStyleElement | null) ??
    Object.assign(document.createElement("style"), { id: STYLE_ELEMENT_ID });
  if (style.textContent !== css) style.textContent = css;
  if (!style.isConnected) document.head.appendChild(style);
}

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const MEDIA_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light";
}

function getStoredTheme(storageKey: string): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return null;
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "system",
  storageKey = "czero-theme",
  theme: themeOverride,
}) => {
  // Apply token overrides as soon as possible (and before paint when supported)
  // so the app's brand is in place before components first render.
  const useIsomorphicEffect =
    typeof document === "undefined" ? React.useEffect : React.useLayoutEffect;
  // Key off the override's content, not its identity, so an inline object
  // literal doesn't re-run this every render.
  const overrideKey = themeOverride ? JSON.stringify(themeOverride) : "";
  useIsomorphicEffect(() => {
    applyThemeVars(themeOverride);
    return () => applyThemeVars(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrideKey]);

  const [theme, setThemeState] = React.useState<Theme>(() => {
    // SSR: return default, will be corrected on mount
    if (typeof window === "undefined") return defaultTheme;
    return getStoredTheme(storageKey) ?? defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    if (theme === "system") return getSystemTheme();
    return theme;
  });

  // Apply theme on mount and when theme changes
  React.useEffect(() => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, [theme]);

  // Listen for system theme changes
  React.useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setResolvedTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch {
      // localStorage not available
    }
  }, [storageKey]);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = "ThemeProvider";

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export type { Theme, ThemeProviderProps, ThemeContextValue };
export type { ThemeOverride, ColorValue } from "../../core/tokens";
