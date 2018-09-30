import AV from 'leancloud-storage'

import globalConfig from './config'

// Init Leancloud
AV.init(globalConfig.leancloud)

export function config() {
  return {
    onError(err) {
      err.preventDefault()
    },
  }
}

window.publicPath = '/public/'
if (process.env.NODE_ENV !== 'development') {
  window.publicPath = '/'
  console.log = function () { }
  console.warn = function () { }
  console.error = function () { }
}
