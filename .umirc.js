export default {
  hash: true,
  history: 'hash',
  publicPath: process.env.NODE_ENV === 'production' ? '/treasure/heartbeat/' : '/',
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true,
        routes: {
          exclude: [/models\//]
        },
        library: 'preact',
        dynamicImport: {
          webpackChunkName: true
        },
        fastClick: true,
        title: '蝉時雨'
      }
    ]
  ]
}
