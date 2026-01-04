import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  base: command === 'serve' ? '/' : '/dist',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  }

}))
