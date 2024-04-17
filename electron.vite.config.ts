/*
 * @Date: 2024-04-07 22:35:38
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-08 11:31:51
 * @FilePath: \Spirit-client\electron.vite.config.ts
 * @Description: True or False
 */
import vue from '@vitejs/plugin-vue'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import { setupPlugins } from './src/main/plugins'

export default defineConfig(() => {
  return {
    main: {
      envPrefix: 'MA_',
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      envPrefix: 'RE_',
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src'),
          '@main': resolve('src/main/src')
        }
      },
      plugins: [...setupPlugins(), vue()],
      build: {
        assetsInlineLimit: 0 // 禁止内联资源
      }
    }
  }
})
