# demo-svelte-rollup-hmr

> Svelte + Rollup + HMR

This is a clone of the official Svelte Rollup template, with added HMR.

Very very experimental this one.

It relies on a [WIP branch of SystemJS](https://github.com/LarsDenBakker/systemjs/tree/reload) (thanks guys!), and a zero-day [POC plugin](https://github.com/rixo/rollup-plugin-hot) to add HMR support to Rollup.

All of this is still only a proof of concept.

## Usage

```bash
git clone git@github.com:rixo/demo-svelte-rollup-hmr.git
cd demo-svelte-rollup-hmr
npm install
npm run dev
```

Open http://localhost:5000.

Go edit files in `src`!
