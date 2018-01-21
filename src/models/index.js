import appModel from './app'
import home from './home'
import post from './post'
import page from './page'

const registerModels = app => {
  app.model(appModel)
  app.model(home)
  app.model(post)
  app.model(page)
}

export default registerModels
