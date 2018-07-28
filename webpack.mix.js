let mix = require('laravel-mix')
let tailwindcss = require('tailwindcss')
let fs = require('fs')
let webpack = require('webpack')
let purgeCss = require('laravel-mix-purgecss')

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/assets/js')
    }
  }
})

mix
  .js('resources/assets/js/app.js', 'public/js')
  .sass('resources/assets/styles/app.scss', 'public/css/app.css')
  .options({
    extractVueStyles: true,
    processCssUrls: false,
    postCss: [tailwindcss('tailwind.config.js')]
  })
  .purgeCss()

if (mix.inProduction()) {
  mix.version()
}
