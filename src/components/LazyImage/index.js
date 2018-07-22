/*
 * 图片懒加载
 * @author: 蝉時雨
 * @date: 2018-07-05
 */

import React, { PureComponent } from 'react'

class LazyImage extends PureComponent {
  constructor(props) {
    super(props)
    const { src, width, height } = this.props
    const temp = `${src}?imageView2/2/w/${width}/h/${height}`
    this.state = {
      src: temp
    }
  }

  componentDidMount() {
    let imgObj = new Image()
    imgObj.onload = () => {
      this.setState({ src: this.props.src })
    }
    imgObj.onerror = () => {
      this.setState({ src: this.props.src })
    }
    imgObj.src = this.props.src
  }

  render({ className, alt }, { src }) {
    return (<img class={className} src={src} alt={alt} />)
  }
}

export default LazyImage