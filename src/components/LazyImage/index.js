/** 
 * @Author: chenxin 
 * @Date: 2018-07-05 10:13:51 
 * @Last Modified by: chenxin 
 * @Last Modified time: 2018-08-27 10:13:51 
 * Description: 图片懒加载
 */ 

import React, { PureComponent } from 'react'

class LazyImage extends PureComponent {
  constructor(props) {
    super(props)
    const { width, height } = this.props
    this.state = {
      width,
      height,
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
    // 加载小图
    const { width, height } = this.state
    const temp = `${src}?imageView2/2/w/${width}/h/${height}`
    this.setState({ src: temp })

    // 加载大图
    let imgObj = new Image()
    imgObj.onload = () => {
      this.setState({ src })
    }
    imgObj.onerror = () => {
      this.setState({ src })
    }
    imgObj.src = src
  }

  render({ className, alt }, { src }) {
    return (<img class={className} src={src} alt={alt} />)
  }
}

export default LazyImage