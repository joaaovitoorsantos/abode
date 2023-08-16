/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

module.exports = withPWA({
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
