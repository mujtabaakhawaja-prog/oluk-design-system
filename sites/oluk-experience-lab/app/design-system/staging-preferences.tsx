"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { StagingPreferenceContext, useStagingPreferences, type StagingCurrency, type StagingPreferenceContextValue, type StagingTheme } from "./staging-preference-context";

const currencyStorageKey = "oluk-sites-currency-v1";
const themeStorageKey = "oluk-sites-theme-preview-v1";

const currencyMeta = {
  GBP: { locale: "en-GB", symbol: "£", rate: 1 },
  USD: { locale: "en-US", symbol: "$", rate: 1.28 },
  EUR: { locale: "de-DE", symbol: "€", rate: 1.17 },
} as const;


export function StagingPreferenceProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [currency, setCurrency] = useState<StagingCurrency>("GBP");
  const [theme, setTheme] = useState<StagingTheme>("light");

  useEffect(() => {
    const storedCurrency = window.localStorage.getItem(currencyStorageKey);
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    if (storedCurrency === "GBP" || storedCurrency === "USD" || storedCurrency === "EUR") setCurrency(storedCurrency);
    if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
  }, []);

  const value = useMemo<StagingPreferenceContextValue>(() => ({
    currency,
    setCurrency: (next) => {
      setCurrency(next);
      window.localStorage.setItem(currencyStorageKey, next);
    },
    theme,
    setTheme: (next) => {
      setTheme(next);
      window.localStorage.setItem(themeStorageKey, next);
    },
  }), [currency, theme]);

  return <StagingPreferenceContext.Provider value={value}>{children}</StagingPreferenceContext.Provider>;
}

export function CurrencySelector({ compact = false }: Readonly<{ compact?: boolean }>) {
  const { currency, setCurrency } = useStagingPreferences();
  return (
    <div aria-label="Currency" data-compact={compact || undefined} data-component="CurrencySelector" role="group">
      {(["GBP", "USD", "EUR"] as const).map((option) => (
        <button aria-pressed={currency === option} key={option} onClick={() => setCurrency(option)} type="button">
          {option} {currencyMeta[option].symbol}
        </button>
      ))}
    </div>
  );
}

export function ThemeSelector({ compact = false }: Readonly<{ compact?: boolean }>) {
  const { theme, setTheme } = useStagingPreferences();
  return (
    <div aria-label="Appearance preview" data-compact={compact || undefined} data-component="ThemeSelector" data-preview-only="true" role="group">
      {(["light", "dark"] as const).map((option) => (
        <button aria-pressed={theme === option} key={option} onClick={() => setTheme(option)} type="button">
          <i aria-hidden="true" data-theme-swatch={option}/>{option === "light" ? "Light" : "Dark"}
        </button>
      ))}
    </div>
  );
}
