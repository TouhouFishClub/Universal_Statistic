const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')

const patterns = [
  path.resolve(__dirname, './node_modules/vuetify/dist/vuetify.min.css'),
  // path.resolve(__dirname, './node_modules/@mdi/font/css/materialdesignicons.min.css')
]

module.exports = {
  publicPath: isProduction ? './' : '/',
  // transpileDependencies: [
  //   'vuetify'
  // ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'css',
      patterns: isProduction ? [] : patterns
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        'vuetify': 'Vuetify',
        'chart.js': 'Chart',
        'vue-chartjs': 'VueChartJs',
      }
    }
  },
  chainWebpack: config => {
    // 分析
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  devServer: {
    proxy: 'http://flanb.msharebox.com:6660/'
  },
}
