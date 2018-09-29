import React, { PureComponent } from 'react'
import router from 'umi/router'
import { Helmet } from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages'

import styles from './index.less'
import config from '../config'

const { title, backstretch } = config

class App extends PureComponent {
  componentDidMount() {
    // 动态背景
    window.$('body').backstretch(backstretch.bgImg, backstretch.bgOption)

    // const { pathname } = this.props.location
    // if (pathname !== '/') {
    //   router.push(pathname)
    // }
  }

  // 等待 live2d.js 加载完成
  handleScriptInject = ({ scriptTags }) => {
    if (scriptTags) {
      const scriptTag = scriptTags[0]
      scriptTag.onload = this.dressup
    }
  }

  // 加载 live2d
  dressup = () => {
    // this.footer._component.dressup()
  }

  render({ children }) {
    return (
      <div class={styles.container}>
        <Helmet
          link={[
            { rel: "apple-touch-icon", sizes: "180x180", href: `${window.publicPath}img/apple-touch-icon.png` },
            { rel: "icon", type: "image/png", sizes: "32x32", href: `${window.publicPath}img/favicon-32x32.png` },
            { rel: "icon", type: "image/png", sizes: "16x16", href: `${window.publicPath}img/favicon-16x16.png` },
          ]}
          script={[{ src: `${window.publicPath}live2d/live2d.min.js` }]}
          // Helmet doesn't support `onload` in script objects so we have to hack in our own
          onChangeClientState={(newState, addedTags) => this.handleScriptInject(addedTags)}
          title={title}
        />

        <Header />
        {/* {children || <Home />}  */}
        {/* <Footer ref={c => this.footer = c} /> */}
      </div>
    )
  }
}

export default App
