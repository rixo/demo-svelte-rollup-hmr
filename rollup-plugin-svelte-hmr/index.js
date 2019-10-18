const path = require('path')
const { createFilter } = require('rollup-pluginutils')
const { createMakeHot } = require('svelte-hmr')

// DEBUG why __dirname is fucked?
// const hotApi = path.resolve(`${__dirname}/runtime/hot-api.js`)
const hotApi = require.resolve(`./rollup-plugin-svelte-hmr/runtime/hot-api.js`)

const makeHot = createMakeHot(hotApi)

const svelteHmr = ({ hot = true, hotOptions = {} } = {}) => {
  const filter = createFilter('**/*.svelte', [])
  return {
    name: 'svelte-hmr',
    transform(code, id) {
      if (!hot) return
      if (!filter(id)) return
      this.addWatchFile(hotApi)
      const transformed = makeHot(id, code, hotOptions)
      return { code: transformed, map: null }
    },
  }
}

export default svelteHmr
