import React, { Component } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import {List, ListItem} from 'material-ui/List'

// 函数防抖
function throttle(fn, wait) {
  let time = Date.now()
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn()
      time = Date.now()
    }
  }
}

const TocWrap = styled(List)`
`

const TocItem = styled(ListItem)`
  font-family: 'Monda', 'PT Mono'!important;
  &:hover {
    color: #f8f!important;
  }
  color: ${props => props.activetoc ? '#f8f!important' : '#555!important'};
  background-color: ${props => props.activetoc ? 'rgba(0, 0, 0, .1)!important' : ''};
`

const body = document.querySelector('body')
const windowHeight = window.innerHeight

class PostToc extends Component {
  componentDidMount() {
    const { toc } = this.props
    let tocTop = []
    let tocPos = 0

    this.handleScroll = throttle(() => {
      if (this.disAbledToc) return
      const length = tocTop.length
      const docTop = body.scrollTop
      if (length > 0) {
        // 计算当前目录
        for (let i = 0; i < length; i++ ) {
          if (tocTop[length - 1] < docTop) {
            tocPos = length - 1
          } else if (tocTop[i] < docTop && tocTop[i + 1] > docTop + windowHeight) {
            tocPos = i
          } else if (tocTop[i] < docTop && tocTop[i + 1] > docTop) {
            tocPos = i + 1
          }
        }
      } else {
        // 获取高度列表
        tocTop = toc.map((o) => document.getElementById(o.title).offsetTop - 30)
      }
      // 更新目录
      this.props.dispatch({
        type: 'post/update',
        payload: {
          tocPos
        }
      })
    }, 500)

    // 监听滚动事件
    // body.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    // 取消滚动监听
    // body.removeEventListener('scroll', this.handleScroll)
  }

  scrollToAnchor = (anchorName) => {
    const { toc } = this.props
    const anchorElement = document.getElementById(anchorName)
    // 禁用滚动更新
    this.disAbledToc = true
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.disAbledToc = false
    }, 3000)
    // 跳转并更新目录
    if(anchorElement) {
      anchorElement.scrollIntoView()
      const tocPos = toc.findIndex((o) => o.title === anchorName)
      this.props.dispatch({
        type: 'post/update',
        payload: {
          tocPos
        }
      })
    }
  }

  renderToc = () => {
    const { toc, tocPos } = this.props
    if (toc.length === 0) return
    const TocList = toc.map((o, i) => {
      const activetoc = (i === tocPos) || ((i + 1) === tocPos && toc[i + 1].level === 2)
      return (
        <TocItem
          key={i}
          primaryText={o.title}
          onClick={() => this.scrollToAnchor(o.title)}
          activetoc={activetoc ? 1 : 0}
        />
      )
    })
    return TocList
  }

  render() {
    return (
      <TocWrap>
        {this.renderToc()}
      </TocWrap>
    )
  }
}

export default connect(({ post }) => ({ ...post }))(PostToc)
