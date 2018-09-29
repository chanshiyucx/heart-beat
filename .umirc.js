export default {
  plugins: [
    ['umi-plugin-react', {
      dva: {
        immer: true,
      },
      routes: {
        exclude: [/models\//],
      },
      library: 'preact',
      dynamicImport: {
        webpackChunkName: true,
      },
      hash: true,
      pwa: true,
      fastClick: true,
      title: '蝉時雨',
    }],
  ]
}