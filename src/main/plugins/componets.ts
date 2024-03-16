import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const setupComponents = () => {
  return Components({
    resolvers: [ElementPlusResolver()]
  })
}

export { setupComponents }
