import * as path from 'path'
import svelte from 'rollup-plugin-svelte-hot'
import hmr from 'rollup-plugin-hot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

const hot = !production

export default {
  input: 'src/main.js',
  output: {
    sourcemap: hot ? 'inline' : true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      ...(!hot && {
        css: css => {
          css.write('public/bundle.css')
        },
      }),
			hot: hot && {
        noReload: false,
        // `optimistic` will try to recover from runtime errors during component
        // init (i.e. constructor). This kind of error can be more safely
        // recovered from when your components are more pure. Otherwise, it can
        // get really funky.
        //
        // Compile error are _always_ recovered from with Nollup.
        //
        optimistic: true,
			},
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !hot && !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    !hot && production && terser(),

    hot && hmr({
      public: 'public',
    }),
  ],
  watch: {
    clearScreen: false,
  },
}
