export default {
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      routes: {
        exclude: [/models\//],
      },
      library: 'preact',
      dynamicImport: {
        webpackChunkName: true,
      },
      history: 'hash',
      pwa: true,
      fastClick: true,
      title: '蝉時雨',
    }],
  ]
}