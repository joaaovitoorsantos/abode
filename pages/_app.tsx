import { Fragment } from 'react'
import Head from 'next/head'
import '@styles/globals.css'
import '@shopify/polaris/build/esm/styles.css'
import type { AppProps } from 'next/app'
import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider } from '@shopify/polaris'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Abode</title>
        <meta name="description" content="Criado por João Vitor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider i18n={enTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    </Fragment>
  )
}
