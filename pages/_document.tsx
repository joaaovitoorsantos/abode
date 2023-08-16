/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
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
        <link rel="apple-touch-startup-image" href="/logo.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
