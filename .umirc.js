export default {
  hash: true,
  history: 'hash',
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
