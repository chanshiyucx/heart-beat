import React, { PureComponent } from 'react'
import router from 'umi/router'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages'
import styles from './index.less'
import config from '../config'

const { backstretch } = config

class App extends PureComponent {
  componentDidMount() {
    // 动态背景
    window.$('body').backstretch(backstretch.bgImg, backstretch.bgOption)

    const { pathname } = this.props.location
    if (pathname !== '/') {
      router.push(pathname)
    }
  }

  render({ children }) {
    return (
      <div class={styles.container}>
        <Header />
        {children || <Home />}
        <Footer ref={c => (this.footer = c)} />
      </div>
    )
  }
}

export default App
