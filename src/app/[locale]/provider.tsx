"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
  locale: string;
  messages: any;
}

export function Providers({ children, locale, messages }: ProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Amsterdam">
      {children}
    </NextIntlClientProvider>
  );
}
