/* eslint-disable @typescript-eslint/no-var-requires */
import withPWA from 'next-pwa'

export default withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    skipWaiting: true,
    // outras opções de configuração PWA aqui
  },
  // outras configurações do Next.js aqui, como reactStrictMode, etc.
  reactStrictMode: true,
})
