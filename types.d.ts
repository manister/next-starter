declare module '*.md' {
  const attributes: Record<string, string>
  const html: string
  export { html, attributes }
}
