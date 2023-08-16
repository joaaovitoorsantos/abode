import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'

import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import enTranslations from '@shopify/polaris/locales/en.json'
import '@styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const abodeId = localStorage.getItem('abodeId')
    if (!abodeId && router.pathname !== '/login') {
      router.push('/login')
    }
  }, [router])

  return (
    <Fragment>
      <AppProvider i18n={enTranslations}>
        <Head>
          {/* Define o nome do atalho */}
          <title>Abode</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="application-name" content="Abode" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="google" content="notranslate" />
          {/* Define o ícone do atalho (substitua o caminho pela URL da imagem que você deseja usar) */}
          <link rel="icon" type="image/png" sizes="32x32" href="/logo.jpg" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo.jpg" />
          <link rel="manifest" href="/manifest.json" />

          {/* Apple */}
          <meta name="apple-mobile-web-app-title" content="Abode" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="apple-touch-icon" sizes="180x180" href="/logo.jpg" />

          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="theme-color" content="#014693" />

          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link rel="apple-touch-startup-image" href="/logo.jpg" />
        </Head>
        <Component {...pageProps} />
      </AppProvider>
    </Fragment>
  )
}
