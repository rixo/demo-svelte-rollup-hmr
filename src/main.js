import * as hot from '@@hot'

import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    name: 'World',
  },
})

export default app

hot.dispose(() => app.$destroy())
hot.accept()
