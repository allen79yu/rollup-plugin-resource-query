const defaultRedirect = (source) => {
  return source.split('?')?.[0]
}

export default function rollupPluginResourceQuery(options = {}) {
  return {
    name: 'rollup-plugin-resource-query',
    resolveId(source, importer) {
      const { resourceQuery, redirect = defaultRedirect } = options || {}
      if (typeof resourceQuery !== 'string') {
        throw new Error(
          'resourceQuery option is required and should be a Sting'
        )
      }
      if (typeof redirect !== 'function') {
        throw new Error(
          'redirect option should be a function or undefined (use default)'
        )
      }

      const regex = /(?<=\?).*/
      const match = source.match(regex)
      const resourceQueryString = match?.[0]

      if (!resourceQueryString) return null

      const isResourceQueryMatch = resourceQuery === resourceQueryString
      if (isResourceQueryMatch) {
        const newSource = redirect(source)
        return this.resolve(newSource, importer, { skipSelf: true })
      }

      return null
    },
  }
}
