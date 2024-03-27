type ContextMenuItem = {
  icon: string
  label: string
  action?: () => void
  expand?: boolean
  children?: ContextMenuItem[]
}
