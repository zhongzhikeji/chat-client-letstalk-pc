
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
const fs = require('node:fs');
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {

    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue()],
  // css: {
  //   postcss: {
  //     plugins: [
  //       require("tailwindcss"),
  //       require("autoprefixer"),
  //     ]
  //   }
  // },
  //   build: {
  //     minify: 'terser',
  //     terserOptions:{
  //       compress:{
  //         drop_console:true,
  //         drop_debugger: true,
  //       }
  //     },
  // },
  server: {
    host: '0.0.0.0',
    port: 3001,
    https: {
      key: fs.readFileSync(path.join(__dirname, 'src', 'https', 'dev-hyp.nouce.dev.key')),
      cert: fs.readFileSync(path.join(__dirname, 'src', 'https', 'dev-hyp.nouce.dev.cert'))
    },
    proxy: {
      "/api": {
        target: "https://foxim.lvyanhui.com",   
        //target: "http://192.168.2.110:8001", 
        changeOrigin: true,
      },
      '/mqtt': {
        target: 'http://120.77.43.64:10889',
        ws: true,
      }

    }
  },
})
