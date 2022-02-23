export const importAll = (r: __WebpackModuleApi.RequireContext): Record<string, unknown> =>
  r.keys().reduce((acc, path) => {
    const fileName = path.split('/')[path.split('/').length - 1].split('.')[0]
    return {
      ...acc,
      [fileName]: r(path),
    }
  }, {})
