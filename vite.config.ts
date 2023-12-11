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
        staticDir: path.join(__dirname, 'basefront'),
        outputDir: path.join(__dirname, 'basefront'),
        indexPath: path.join(__dirname, 'basefront', 'index.html'),
        // Required - Routes to render.
        routes: ['/login', '/register', '/own/prerender'],
        /*
        #nginx配置
        location /login {
                root /usr/share/nginx/html/basefront/login;
                index index.html index.htm;
                try_files $uri $uri/ /index.html;
        }
        location /own/prerender {
                root /usr/share/nginx/html/basefront/own/prerender;
                index index.html index.htm;
                try_files $uri $uri/ /index.html;
        }
        location / {
                root /usr/share/nginx/html/basefront;
                index index.html index.htm;
                try_files $uri $uri/ /index.html;
        }
        */
        postProcess(renderedRoute) {
          // Ignore any redirects.
          renderedRoute.route = renderedRoute.originalRoute
          // Basic whitespace removal. (Don't use this in production.)
          // renderedRoute.html = renderedRoute.html.split(/>[\s]+</gim).join('><')
          // Remove /index.html from the output path if the dir name ends with a .html file extension.
          // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
          if (renderedRoute.route.endsWith('.html')) {
            renderedRoute.outputPath = path.join(
              __dirname,
              'basefront',
              renderedRoute.route,
            )
          }

          return renderedRoute
        },
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
    // 使用'./'深层嵌套路由刷新时会加载不到静态文件
    base: env.VITE_APP_BASE_FLODER,
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
      outDir: 'basefront',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500, // chunks 大小限制
      minify: 'terser',
      terserOptions: { 
        compress: { // 打包时清除 console 和 debug 相关代码
          // drop_console: true,
          // drop_debugger: true,
        },
      },
      // rollupOptions: {
      //   output: {
      //     manualChunks(id) {
      //       if (id.includes('node_modules')) {
      //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //       }
      //     },
      //     chunkFileNames: (chunkInfo) => {
      //       const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
      //       const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
      //       return `js/${fileName}/[name].[hash].js`;
      //     }
      //   }
      // }
    },
    server: {
      open: true, 
      cors: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7001',
          changeOrigin: true,
          ws: true, // 支持 websocket
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    },
  }
})
