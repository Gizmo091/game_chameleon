import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  preview: {
    host: '0.0.0.0',
    port: 3680,
    allowedHosts: [
      'cameleon.vedielaute.fr',
      'localhost',
      '127.0.0.1'
    ]
  }
})
