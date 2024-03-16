import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const setupAutoImport = () => {
  return AutoImport({
    resolvers: [ElementPlusResolver()]
  })
}

export { setupAutoImport }
