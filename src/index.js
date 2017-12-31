import dva from 'dva'
import createLoading from 'dva-loading'
import { hashHistory } from 'dva/router'
import 'highlight.js/styles/atelier-forest-dark.css'
import 'gitalk/dist/gitalk.css'
import registerModels from './models/index'
import router from './router'
import config from './config'
import AV from 'leancloud-storage'

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
app.use(createLoading())

// 3. Model
registerModels(app)

// 4. Router
app.router(router)

// 5. Start
app.start('#root')
