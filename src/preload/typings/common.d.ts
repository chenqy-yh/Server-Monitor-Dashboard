type MethodMap<T> = Record<
  string,
  {
    channel: T
    params: string[]
  }
>
