# rollup-plugin-resource-query

![npm](https://img.shields.io/npm/v/rollup-plugin-resource-query) ![NPM](https://img.shields.io/npm/l/rollup-plugin-resource-query)

a plugin to redirect resource query

It's a tiny rollup plugin to help redirect resourcQuery

**Example**

```
../static/svgs/icon.svg?url -> ../static/svgs/icon.svg
```

## Why?

I use [svgr](https://react-svgr.com/) to take care my svg resources. Webpack has a support of resourceQuery ([link](https://react-svgr.com/docs/webpack/#use-svgr-and-asset-svg-in-the-same-project)) but rollup didn't.

I am using both of them in my project so i write this plugin to help redirect the resourceQuery in rollup for svgr.

## Usage

### Step 1: install

```
npm install rollup-plugin-resource-query -D
// or
yarn add rollup-plugin-resource-query -D
```

### Step 2: update config

Just place it before the `url()` and `svgr()` plugins. Give it a resourceQuery option to target the query that need to be redirect.

The example below will redirect `xx.svg?url` to `xx.svg`

**Example**

```js
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import resourceQuery from 'rollup-plugin-resource-query'

export default {
  plugins: [resourceQuery({ resourceQuery: 'url' }), url(), svgr()],
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
}
```

Then it's done. it should be work.

**Example with custom redirect**

```js
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import resourceQuery from 'rollup-plugin-resource-query'

const redirect = (source) => {
  return `${source}&added`
}

export default {
  plugins: [resourceQuery({ resourceQuery: 'url', redirect }), url(), svgr()],
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
}
```

This example added a redirect option.
You can customize the way you want if the default one is not enough for your usage.

this example will redirect tha path from `xx.svg?url` to `xx.svg?url&added`

### Options

| Key           | Description                                                                                                             | Type     | isRequired | Default                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ------------------------------------------------------------------------ |
| resourceQuery | a string to match the target query to redirect.                                                                         | String   | Y          | N/A                                                                      |
| redirect      | custom function to redirect. it will path the file path as a only parameter. just return the path you want to redirect. | function | N          | redirect to the path without query. ex. `xx.svg?resourceQuery -> xx.svg` |
