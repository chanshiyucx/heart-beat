import React, { PureComponent } from 'react'
import classNames from 'classnames/bind'
import styles from './index.less'

const cx = classNames.bind(styles)

class LazyImage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.loadImg(this.props.src)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.loadImg(nextProps.src)
    }
  }

  loadImg = src => {
    let imgObj = new Image()
    imgObj.onload = () => {
      this.setState({ loading: false })
    }
    imgObj.src = src
  }

  render({ className, src, alt }, { loading }) {
    return loading ? (
      <div class={cx('box')}>
        <div class={cx('flower-spinner')}>
          <div class={cx('dots-container')}>
            <div class={cx('bigger-dot')}>
              <div class={cx('smaller-dot')} />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <img class={className} src={src} alt={alt} />
    )
  }
}

export default LazyImage
