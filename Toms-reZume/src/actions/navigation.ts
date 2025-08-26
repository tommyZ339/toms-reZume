"use server";

import { redirect } from "next/navigation";

export async function GoDashboardAction(formData: FormData) {
  const locale = formData.get("locale") as string;
  redirect(`/${locale}/app/dashboard`);
}
export async function GoResumesAction(formData: FormData) {
  const locale = formData.get("locale") as string;
  redirect(`/${locale}/app/dashboard/resumes`);
}
export async function GoTemplatesAction(formData: FormData) {
  const locale = formData.get("locale") as string;
  redirect(`/${locale}/app/dashboard/templates`);
}
