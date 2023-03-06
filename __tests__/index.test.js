const rollupPluginResourceQuery = require('../dist/cjs/index.js')

const DEFAULT_TESTING_OPTIONS = {
  resourceQuery: 'url',
}
const DEFAULT_TESTING_PATH = '/static/svgs/test.svg'

const getTestMock = (options, mockResolve) => {
  const plugin = rollupPluginResourceQuery(options)
  mockResolve.mockClear()
  plugin.resolve = mockResolve

  return plugin
}

describe('test rollup-plugin-resource-query', () => {
  const mockResolve = jest.fn()
  it('rollupPluginResourceQuery should redirect right', () => {
    const plugin = getTestMock(DEFAULT_TESTING_OPTIONS, mockResolve)
    plugin.resolveId(`${DEFAULT_TESTING_PATH}?url`, 'importer')
    expect(mockResolve).toHaveBeenCalledWith(DEFAULT_TESTING_PATH, 'importer', {
      skipSelf: true,
    })
  })

  it('should throw an error if resourceQuery option is not a string', () => {
    const invalidOptions = [{}, null, undefined, 123, [], () => {}]

    invalidOptions.forEach((options) => {
      expect(() =>
        getTestMock(options, mockResolve).resolveId(
          `${DEFAULT_TESTING_PATH}?url`,
          'importer'
        )
      ).toThrowError('resourceQuery option is required and should be a String')
    })
  })

  it('should throw an error if redirect option is not a function or undefined', () => {
    const invalidOptions = [
      { resourceQuery: 'url', redirect: null },
      { resourceQuery: 'url', redirect: 123 },
      { resourceQuery: 'url', redirect: 'url' },
      { resourceQuery: 'url', redirect: [] },
    ]

    invalidOptions.forEach((options) => {
      expect(() =>
        getTestMock(options, mockResolve).resolveId(
          `${DEFAULT_TESTING_PATH}?url`,
          'importer'
        )
      ).toThrowError(
        'redirect option should be a function or undefined (use default)'
      )
    })
  })

  it('should resolve to null if there is no resource query string', () => {
    const result = getTestMock(DEFAULT_TESTING_OPTIONS, mockResolve).resolveId(
      DEFAULT_TESTING_PATH,
      'importer.js'
    )

    expect(mockResolve).not.toHaveBeenCalled()
    expect(result).toBeNull()
  })

  it('should resolve to null if resource query string does not match', () => {
    const result = getTestMock(DEFAULT_TESTING_OPTIONS, mockResolve).resolveId(
      `${DEFAULT_TESTING_PATH}?bar`,
      'importer.js'
    )

    expect(mockResolve).not.toHaveBeenCalled()
    expect(result).toBeNull()
  })
})
