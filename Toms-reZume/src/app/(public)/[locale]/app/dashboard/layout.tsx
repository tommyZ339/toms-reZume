import { ReactNode } from "react";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import Document from "@/components/Document";
import { Providers } from "@/app/providers";
import Client from "./client";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";


type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};
export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    title: t("title") + " - " + t("dashboard"),
  };
}
export default async function LocaleLayout({ children, params: { locale } }: Props) {
  setRequestLocale(locale);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <Document locale={locale}>
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <Client>{children}</Client>
        </Providers>
      </NextIntlClientProvider>
    </Document>
  );
}