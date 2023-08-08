import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [vue()],
    base: env.VITE_USER_NODE_ENV === 'production' ? '/baseSite/' : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    build: {
      sourcemap: false, // 不生成 source map 
      outDir: 'baseSite',
      terserOptions: { 
        compress: { // 打包时清除 console 和 debug 相关代码
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      open: true, 
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, 
          changeOrigin: true, 
          ws: true, // 支持 websocket
          rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
        }
      }
    }
  }
})
