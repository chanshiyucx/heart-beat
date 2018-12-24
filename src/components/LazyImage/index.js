import React, { PureComponent } from 'react'
import classNames from 'classnames/bind'
import styles from './index.less'

const cx = classNames.bind(styles)

const Flower = () => (
  <div class={cx('flower-spinner')}>
    <div class={cx('dots-container')}>
      <div class={cx('bigger-dot')}>
        <div class={cx('smaller-dot')} />
      </div>
    </div>
  </div>
)

const Fingerprint = () => (
  <div class={cx('fingerprint-spinner')}>
    <div class={cx('spinner-ring')} />
    <div class={cx('spinner-ring')} />
    <div class={cx('spinner-ring')} />
    <div class={cx('spinner-ring')} />
    <div class={cx('spinner-ring')} />
    <div class={cx('spinner-ring')} />
    <div class={cx('spinner-ring')} />
    <div class={cx('spinner-ring')} />
    <div class={cx('spinner-ring')} />
  </div>
)

const Trinity = () => (
  <div class={cx('trinity-rings-spinner')}>
    <div class={cx('circle')} />
    <div class={cx('circle')} />
    <div class={cx('circle')} />
  </div>
)

const Atom = () => (
  <div class={cx('atom-spinner')}>
    <div class={cx('spinner-inner')}>
      <div class={cx('spinner-line')} />
      <div class={cx('spinner-line')} />
      <div class={cx('spinner-line')} />
      <div class={cx('spinner-circle')}>&#9679;</div>
    </div>
  </div>
)

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

  getLoading = index => {
    const row = ~~(index / 4)
    const remain = row % 4
    let loading
    switch (remain) {
      case 0:
        loading = <Flower />
        break
      case 1:
        loading = <Fingerprint />
        break
      case 2:
        loading = <Trinity />
        break
      case 3:
        loading = <Atom />
        break
      default:
        loading = <Flower />
        break
    }
    return loading
  }

  render({ className, src, alt, index }, { loading }) {
    return loading ? (
      <div class={cx('box')}>{this.getLoading(index)}</div>
    ) : (
      <img class={className} src={src} alt={alt} />
    )
  }
}

export default LazyImage
