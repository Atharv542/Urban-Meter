import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import tailwindcss from '@tailwindcss/vite'  

export default defineConfig({
  plugins: [react(),  tailwindcss()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis' // ✅ Fix global is not defined
      },
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })]
    }
  }
})
