import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const locale = useLocale();
  redirect(`/${locale}/app/dashboard/resumes`);
}
