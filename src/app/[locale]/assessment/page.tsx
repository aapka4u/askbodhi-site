import { setRequestLocale } from 'next-intl/server';
import AssessmentClient from './AssessmentClient';

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AssessmentClient />;
}
