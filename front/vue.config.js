module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://flanb.msharebox.com:6660/'
  },
}
