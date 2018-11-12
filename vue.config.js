module.exports = {
  chainWebpack:  config => {
    config
    .entry('index')
      .add('babel-polyfill')
  }
}