//Layout cho tất cả các trang trong app. Bọc các thứ ở đây.
import { Inter as FontSans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { getMessages, getTranslations } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'

import './globals.css'
import { cn } from '@/lib/utils'

import { ThemeProvider } from '@/components/features/theme-provider'
import AppProvider from '@/components/features/app-provider'

import { Toaster } from '@/components'
import { Footer } from '@/components'

import { Locale, locales } from '@/config'
import { baseOpenGraph } from '@/shared-metadata'
import GoogleTag from '@/components/features/google-tag'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale, namespace: 'Brand' })
  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('defaultTitle'),
    },
    openGraph: {
      ...baseOpenGraph,
    },
    // other: {
    //   'google-site-verification': 'KKr5Sgn6rrXntMUp1nDIoQR7mJQujE4BExrlgcFvGTg'
    // }
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  setRequestLocale(locale)
  const messages = await getMessages()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextTopLoader showSpinner={false} color='hsl(var(--foreground))' />
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              {children}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </AppProvider>
        </NextIntlClientProvider>
        <GoogleTag />
      </body>
    </html>
  )
}
