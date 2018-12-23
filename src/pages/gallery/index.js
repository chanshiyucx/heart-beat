import React, { PureComponent } from 'react'
import classNames from 'classnames/bind'
import _ from 'lodash'
import baguetteBox from 'baguettebox.js'

import { Transition, Loading, LazyImage } from '../../components'
import config from '../../config'
import styles from './index.less'

const cx = classNames.bind(styles)
const { covers } = config
const list = covers.map(src => ({ src, loading: true }))

class Gallery extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      list
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        {
          showLoading: false
        },
        () => this.initLightBox()
      )
    }, 1000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) {
      this.initLightBox()
    }
  }

  initLightBox = () => {
    baguetteBox.run('#gallery')
  }

  render({}, { showLoading, list }) {
    return (
      <div class={cx('container')} id="gallery">
        <Transition visible={!showLoading} animation="drop" duration={600}>
          <div>
            <ul>
              {list.map((o, i) => {
                return (
                  <li>
                    <a href={o.src}>
                      <LazyImage key={i} src={o.src} alt="" />
                    </a>
                  </li>
                )
              })}
              {/* 添加四个空项目 */}
              {_.range(4).map((o, i) => {
                return <li class="empty" style="height: 0; margin: 0;" />
              })}
            </ul>
          </div>
        </Transition>

        {showLoading && <Loading className={cx('loading')} />}
      </div>
    )
  }
}

export default Gallery
