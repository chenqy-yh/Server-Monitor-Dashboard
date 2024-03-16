import { setupAutoImport } from './auto-import'
import { setupComponents } from './componets'

const setupPlugins = () => {
  return [setupAutoImport(), setupComponents()]
}

export { setupPlugins }
