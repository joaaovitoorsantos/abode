import type { AppProps } from 'next/app'
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
        <Component {...pageProps} />
      </AppProvider>
    </Fragment>
  )
}
