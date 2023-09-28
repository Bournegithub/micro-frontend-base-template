import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import vitePrerender from 'vite-plugin-prerender';

/*
  vite-plugin-prerender插件在vite中会报require问题,
  两个解决方案:
  1. 去除package.json中type: "moudle",
  2. 修改 vite-plugin-prerender中dist文件夹内mjs文件
  这里采用第二种(第一种方案不解决问题,直接解决提出了问题的人),因为修改了node_moudle,所以安装了patch-package,做了一个补丁. (package.json script 增加 "postinstall": "patch-package")详情请参考patch-package文档
*/


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
      vitePrerender({
        staticDir: path.join(__dirname, 'baseSite'),
        // Required - Routes to render.
        routes: ['/', '/login', '/own/prerender'],
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
