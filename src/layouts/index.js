import React, { PureComponent } from 'react'
import router from 'umi/router'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages'
import fireworks from '../assets/lib/fireworks'
import { isMobile } from '../utils'
import styles from './index.less'
import config from '../config'

const { backstretch } = config

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      renderBg: false
    }
  }

  componentDidMount() {
    this.renderBg()
    if (!isMobile) {
      fireworks()
    }

    const { pathname } = this.props.location
    if (pathname !== '/') {
      router.push(pathname)
    }
  }

  renderBg() {
    if (window.$) {
      // 动态背景
      window.$('body').backstretch(backstretch.bgImg, backstretch.bgOption)
    } else {
      setTimeout(this.renderBg, 500)
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
