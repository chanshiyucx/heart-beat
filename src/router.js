import { Router, Switch, Route } from 'dva/router'
import styled from 'styled-components'

// 公共组件
import Header from './components/header'
import Footer from './components/footer'

// 路由页面
import Home from './routes/home'
import Post from './routes/post'
import Archives from './routes/archives'
import Categories from './routes/categories'
import Tags from './routes/tags'
import ShuoShuo from './routes/shuoshuo'
import Books from './routes/books'
import Friends from './routes/friends'
import About from './routes/about'

import config from './config'
const { shuoshuoOptions, booksOptions, friendsOptions, aboutOptions } = config

// 最外围容器
const Container = styled.div`
  position: relative;
  min-height: 100%;
  margin: 0 auto;
  max-width: 900px;
`

const Content = styled.div`
  padding-bottom: 100px;
`

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Container>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:number" component={Post} />
            <Route exact path="/archives" component={Archives} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/tags" component={Tags} />
            {shuoshuoOptions.showPage && (
              <Route exact path="/shuoshuo" component={ShuoShuo} />
            )}
            {booksOptions.showPage && (
              <Route exact path="/books" component={Books} />
            )}
            {friendsOptions.showPage && (
              <Route exact path="/friends" component={Friends} />
            )}
            {aboutOptions.showPage && (
              <Route exact path="/about" component={About} />
            )}
          </Switch>
        </Content>
        <Footer />
      </Container>
    </Router>
  )
}

export default RouterConfig
