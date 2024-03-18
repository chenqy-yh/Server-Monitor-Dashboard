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
      optimizeDeps: {
        include: [
          `monaco-editor/esm/vs/language/json/json.worker`,
          `monaco-editor/esm/vs/language/css/css.worker`,
          `monaco-editor/esm/vs/language/html/html.worker`,
          `monaco-editor/esm/vs/language/typescript/ts.worker`,
          `monaco-editor/esm/vs/editor/editor.worker`
        ]
      }
    }
  }
})
