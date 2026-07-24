import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static-site build. Emits a self-contained dist/ that can be served anywhere.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
