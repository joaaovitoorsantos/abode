/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public', // destino dos arquivos de Service Worker
    // outras configurações específicas do PWA podem ser adicionadas aqui
  },
  reactStrictMode: true,
  // outras configurações específicas do Next.js podem ser adicionadas aqui
})
