"use client";

import { createContext, useContext } from "react";

export type StagingCurrency = "GBP" | "USD" | "EUR";
export type StagingTheme = "light" | "dark";
export type StagingPreferenceContextValue = Readonly<{ currency: StagingCurrency; setCurrency: (currency: StagingCurrency) => void; theme: StagingTheme; setTheme: (theme: StagingTheme) => void }>;
export const StagingPreferenceContext = createContext<StagingPreferenceContextValue | null>(null);

export function useStagingPreferences() {
  const context = useContext(StagingPreferenceContext);
  if (!context) throw new Error("useStagingPreferences must be used inside StagingPreferenceProvider");
  return context;
}

const rates = { GBP: 1, USD: 1.28, EUR: 1.17 } as const;
const locales = { GBP: "en-GB", USD: "en-US", EUR: "de-DE" } as const;
export function convertStagingPrice(gbpDisplay: string, currency: StagingCurrency): string {
  const numeric = Number(gbpDisplay.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric)) return gbpDisplay;
  return new Intl.NumberFormat(locales[currency], { currency, maximumFractionDigits: 0, style: "currency" }).format(numeric * rates[currency]);
}
export function StagingPrice({ value }: Readonly<{ value: string }>) { const { currency } = useStagingPreferences(); return <>{convertStagingPrice(value, currency)}</>; }
