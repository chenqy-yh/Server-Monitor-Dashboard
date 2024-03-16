interface ImportMetaEnv {
  readonly MA_TencentSecretID: string
  readonly MA_TencentSecretKey: string
  readonly MA_TencentRegion: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
