import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    open: false,
    port: 8195,
    https: {
      key: fs.readFileSync('../src/static/ssl/cert.key'),
      cert: fs.readFileSync('../src/static/ssl/cert.crt')
    }
  }
})
