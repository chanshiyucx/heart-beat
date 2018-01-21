import dva from 'dva'
import { hashHistory } from 'dva/router'
import AV from 'leancloud-storage'
import 'highlight.js/styles/atelier-forest-dark.css'
import 'gitalk/dist/gitalk.css'
import registerModels from './models/index'
import router from './router'
import config from './config'

// animated
window.$.fn.extend({
  animateCss: function (animationName, callback) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      window.$(this).removeClass('animated ' + animationName)
      if (callback) {
        callback()
      }
    })
    return this
  }
})

// Leancloud
AV.init(config.leancloud)

// 1. Initialize
const app = dva({
  history: hashHistory,
  onError(e) {
    console.log('出错啦！', e)
  },
})

// 2. Plugins
// app.use()

// 3. Model
registerModels(app)

// 4. Router
app.router(router)

// 5. Start
app.start('#root')
