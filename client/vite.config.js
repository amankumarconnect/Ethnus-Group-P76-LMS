import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Optional: Add a server proxy to avoid CORS
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //     },
  //     '/uploads': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //     }
  //   }
  // }
})