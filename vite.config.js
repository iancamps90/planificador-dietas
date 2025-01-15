import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'https://iancamps90.github.io/planificador-dietas/',
  plugins: [react()],
});
