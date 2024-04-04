import MarkdownIt from 'markdown-it'

const useMarkdown = () => {
  const md = new MarkdownIt()

  const render = (content: string) => {
    return md.render(content)
  }

  return { render }
}

const markdown = useMarkdown()

export { markdown }
