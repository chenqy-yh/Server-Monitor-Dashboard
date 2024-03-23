type RowItem = {
  name: string
  open: boolean
  children: RowItem[]
  vis?: boolean
}

export type { RowItem }
