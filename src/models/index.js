import appModel from './app'
import postList from './postList'
import post from './post'
import site from './site'

const registerModels = (app) => {
  app.model(appModel)
  app.model(postList)
  app.model(post)
  app.model(site)
}

export default registerModels
