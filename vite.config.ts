import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/TimezonesWeb/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: 'Timezones',
        short_name: 'Timezones',
        description: 'Keep track of your friends across timezones.',
        start_url: '/TimezonesWeb/',
        scope: '/TimezonesWeb/',
        display: 'standalone',
        background_color: '#141218',
        theme_color: '#141218',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
