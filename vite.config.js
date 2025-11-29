import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // This makes everything work both locally and on GitHub Pages
  base: process.env.GITHUB_PAGES ? '/wordle-clone/' : '/',

  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],

      manifest: {
        name: 'Wordle Offline Game',
        short_name: 'Wordle',
        description: 'A Wordle game that can be played offline',
        theme_color: '#3B82F6',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: process.env.GITHUB_PAGES ? '/wordle-clone/' : '/',
        scope: process.env.GITHUB_PAGES ? '/wordle-clone/' : '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // THIS IS THE CRITICAL LINE FOR GITHUB PAGES
        navigateFallback: '/wordle-clone/index.html',

        // Optional: prevent falling back on assets or APIs
        navigateFallbackDenylist: [
          /^\/__/,
          /^\/api/,
          /\.(png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|eot)$/
        ],

        // Clean up old caches on activation (recommended)
        cleanupOutdatedCaches: true
      },

      // Helpful during development
      devOptions: {
        enabled: false // set to true only if you want to test PWA locally
      }
    })
  ]
})
