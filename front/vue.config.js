const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')

const patterns = [
  path.join(__dirname, 'node_modules/vuetify/dist/vuetify.css'),
  path.join(__dirname, 'node_modules/@mdi/font/css/materialdesignicons.min.css'),
]

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
        'vue': 'vue',
        'vue-router': 'vue-router',
        'vuex': 'vuex',
        'axios': 'axios',
        'vuetify': 'vuetify',
        'chart.js': 'chart.js',
        'vue-chartjs': 'vue-chartjs',
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'css',
      patterns: isProduction ? [] : patterns
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
