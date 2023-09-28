import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import seoPrerender from 'vite-plugin-seo-prerender';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => /^micro-app/.test(tag)
          }
        }
      }),
      seoPrerender({
        routes: ['/own/prerender', '/login', '/404'] // 需要生成的路由
      }),
      // 兼容不支持 native ESM 的浏览器
      legacy({
        targets: ['chrome < 60', 'edge < 15', 'Firefox < 59'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: [
          'es.symbol',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.filter',
          'es.array.for-each',
          'es.array.flat-map',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.object.to-string',
          'web.dom-collections.for-each',
          'esnext.global-this',
          'esnext.string.match-all'
        ]
      }),
    ],
    base: env.VITE_USER_NODE_ENV === 'production' ? './' : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          math: "always", // 括号内才使用数学计算
          globalVars: {
            // 全局变量
            mainColor: "red",
          },
        },
      },
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
    },
  }
})
