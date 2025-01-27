import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore (ノಠ益ಠ)ノ彡┻━┻ 
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/features/api'),
      '@app': path.resolve(__dirname, './src/app'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@sass': path.resolve(__dirname, './src/assets/sass'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },

})
