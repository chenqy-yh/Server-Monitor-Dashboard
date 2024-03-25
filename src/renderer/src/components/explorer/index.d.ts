type RowItem = {
  name: string
  dir: boolean
  children: RowItem[]
  open: boolean
  size: number
  vis?: boolean
}

export type { RowItem }
