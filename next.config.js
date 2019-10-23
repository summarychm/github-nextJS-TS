const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')

const configUrls = require("./configUrls");
const configs = {
  distDir: 'dest',
  // generateEtags: true,// 是否给每个路由生成Etag
  // // 页面内容缓存配置(内存)
  // onDemandEntries: {
  //   maxInactiveAge: 25 * 1000,//缓存的时长（ms）
  //   pagesBufferLength: 2,//同时缓存个数
  // },
  // // 在pages目录下那种后缀的文件会被认为是页面
  // pageExtensions: ['ts', 'jsx', 'js'],
  // // 配置buildId
  // generateBuildId: async () => {
  //   if (process.env.YOUR_BUILD_ID)
  //     return process.env.YOUR_BUILD_ID
  //   return null // 返回null使用默认的unique id
  // },
  // // 手动修改webpack config
  // webpack(config, options) {
  //   return config
  // },
  // // 修改webpackDevMiddleware配置
  // webpackDevMiddleware: config => {
  //   return config
  // },
  // // 可以在页面上通过 procsess.env.customKey 获取 value
  // env: {
  //   customKey: 'value',
  // },
  // // 下面两个要通过 'next/config' 来读取
  // // 只有在服务端渲染时才会获取的配置
  // serverRuntimeConfig: {
  //   mySecret: 'secret',
  //   secondSecret: process.env.SECOND_SECRET,
  // },
  // 在服务端渲染和客户端渲染都可获取的配置
  publicRuntimeConfig: {
    OAUTH_BASE_URL: configUrls.github.oauth_url,
    OAUTH_URL: `${configUrls.github.oauth_url}?client_id=${configUrls.github.client_id}&scope=${configUrls.github.scope}`,
  },
}

if (typeof require !== 'undefined')
  require.extensions['.css'] = file => {}
// 合并nextJS配置
module.exports = withCss(withTypescript(configs))
