"use client";

import {
  GoDashboardAction,
  GoTemplatesAction,
  GoResumesAction,
} from "@/actions/navigation";
import { useLocale } from "next-intl";

export default function GoDashboard({
  children,
  type = "dashboard",
}: {
  children: React.ReactNode;
  type?: "dashboard" | "templates" | "resumes";
}) {
  const actionMap = {
    dashboard: GoDashboardAction,
    resumes: GoResumesAction,
    templates: GoTemplatesAction,
  };

  const locale = useLocale();
  

  return <form action={actionMap[type]}>
    <input type="hidden" name="locale" value={locale} />
    {children}
    </form>;
}
