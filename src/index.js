export default function rollupPluginResourceQuery ({ resourceQuery } = {}) {
  return {
    name: 'rollup-plugin-resource-query',
    resolveId(source, importer) {
      if (typeof resourceQuery !== 'string') {
        throw new Error('resourceQuery option is required and should be a String')
      }

      const regex = /(?<=\?).*/
      const match = source.match(regex)
      const resourceQueryString = match?.[0]

      if (!resourceQueryString) return null
      
      const isResourceQueryMatch = resourceQuery === resourceQueryString
      if (isResourceQueryMatch) {
        const newSource = source.split('?')?.[0]
        return this.resolve(newSource, importer, { skipSelf: true })
      }

      return null
    }
  }
}