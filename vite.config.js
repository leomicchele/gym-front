import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        display: 'standalone',
        display_override: ['windowControlsOverlay'],
        lang: 'es-ES',
        name: 'Kaiross Gym App',
        short_name: 'Kaiross Gym',
        description: 'App Rutinas',
        theme_color: "#19223c",
        background_color: "#d4d4d4",
        icons: [         
          {
            src: '/imagenes/kaiross-32.png',
            sizes: '32x32',
            type: 'image/png',
            purpose: 'any',
          },         
          {
            src: '/imagenes/kaiross-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any',
          },         
          {
            src: '/imagenes/kaiross-250.png',
            sizes: '250x250',
            type: 'image/png',
            purpose: 'any',
          }      
        ],        
      }, 
      registerType: 'prompt',
      devOptions: {
        enabled: true
      }
    })
  ],
})

