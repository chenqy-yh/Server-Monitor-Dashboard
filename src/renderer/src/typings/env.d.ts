/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly RE_Remoteserver_Port: number
  readonly RE_Remoteserver_Prefix: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
