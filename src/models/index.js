import appModel from './app'
import postList from './postList'
import post from './post'
import page from './page'

const registerModels = (app) => {
  app.model(appModel)
  app.model(postList)
  app.model(post)
  app.model(page)
}

export default registerModels
