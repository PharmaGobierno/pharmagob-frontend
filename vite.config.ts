import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {}
  },
  server: {
    allowedHosts: 'all'
    host: true,
    port: 8080,
    watch: {
      usePolling: true
    }
  }
})
