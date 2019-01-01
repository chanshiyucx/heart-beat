import React, { PureComponent } from 'react'
import router from 'umi/router'
import FontFaceObserver from 'fontfaceobserver'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages'
import fireworks from '../assets/lib/fireworks'
import { isMobile } from '../utils'
import styles from './index.less'
;(function() {
  const font = new FontFaceObserver('Noto Serif SC', {
    weight: '400'
  })

  font.load().then(() => {
    document.body.style.fontFamily = 'Noto Serif SC, Helvetica, PingFang SC, sans-serif'
  })
})()

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      renderBg: false
    }
  }

  componentDidMount() {
    if (!isMobile) {
      fireworks()
    }
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
