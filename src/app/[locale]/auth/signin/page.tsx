import { Metadata } from 'next'
import { SignInForm } from '@/components/auth'
import { getTranslations } from 'next-intl/server'
import { Locale } from '@/i18n/routing'

type Params = Promise<{
  locale: Locale
  [key: string]: string | string[]
}>

type SearchParams = Promise<{
  callbackUrl?: string
  [key: string]: string | string[] | undefined
}>

interface SignInPageProps {
  params: Params
  searchParams: SearchParams
}

export async function generateMetadata({
  params,
  searchParams,
}: SignInPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Auth' })

  return {
    title: t('signIn'),
    description: t('signInDescription'),
  }
}

export default async function SignInPage({
  params,
  searchParams,
}: SignInPageProps) {
  const { locale } = await params
  const { callbackUrl = '/' } = await searchParams
  const t = await getTranslations({ locale, namespace: 'Auth' })

  const labels = {
    signIn: t('signIn'),
    email: t('email'),
    password: t('password'),
    forgotPassword: t('forgotPassword'),
    noAccount: t('noAccount'),
    signUp: t('signUp'),
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <SignInForm locale={locale} callbackUrl={callbackUrl} labels={labels} />
    </div>
  )
}
