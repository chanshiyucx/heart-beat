import { Router, Switch, Route } from 'dva/router'
import styled from 'styled-components'

// 公共组件
import { Cover, Header, Footer } from './components'

// 路由页面
import Home from './routes/Home'
import Post from './routes/Post'
import Archives from './routes/Archives'
import Categories from './routes/Categories'
import Tags from './routes/Tags'
import Shuoshuo from './routes/Shuoshuo'
import Books from './routes/Books'
import Friends from './routes/Friends'
import About from './routes/About'

import config from './config'
const { shuoshuoOptions, booksOptions, friendsOptions, aboutOptions } = config

// 最外围容器
const Container = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 100%;
  max-width: 900px;
`

const Content = styled.div`
  padding-bottom: 100px;
`

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Container>
        <Cover />
        <Header />
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:number" component={Post} />
            <Route exact path="/archives" component={Archives} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/tags" component={Tags} />
            {shuoshuoOptions.showPage && <Route exact path="/shuoshuo" component={Shuoshuo} />}
            {booksOptions.showPage && <Route exact path="/books" component={Books} />}
            {friendsOptions.showPage && <Route exact path="/friends" component={Friends} />}
            {aboutOptions.showPage && <Route exact path="/about" component={About} />}
          </Switch>
        </Content>
        <Footer />
      </Container>
    </Router>
  )
}

export default RouterConfig
