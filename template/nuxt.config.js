const tailwind = require('tailwindcss');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | {{ name }}',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#004066" },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    postcss: [
      tailwind('./tailwind.js'),
      require('cssnano')({
        preset: 'default',
        discardComments: { removeAll: true }
      })
    ],
    extend (config, { isDev, isClient }) {
      /*
      ** Cleanup CSS with PurgeCSS
      */
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            whitelist: ['html', 'body']
          })
        )
      }
    }
  },
  css: [
    '@/assets/css/main.css'
  ],
  router: {
  },
  modules: [
    ['@nuxtjs/pwa', { onesignal: false }],
    '@nuxtjs/axios'
  ],
  plugins: [
    { src: '~/plugins/svg-sprite.js', ssr: false }
  ]
};
