/*
 * 首页
 * @author: 蝉時雨
 * @date: 2018-07-15
 */

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'dva'
import _ from 'lodash'
import classNames from 'classnames/bind'

import Transition from '../components/Transition'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'
import { isMobile } from '../utils'
import styles from './index.less'

const cx = classNames.bind(styles)

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      disabled: false,
    }
  }

  componentDidMount() {
    this.next()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.postList.length) {
      this.setState({ showLoading: false })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/updateState',
      payload: { postList: [] },
    })

    // 移除事件
    this.postListNode.removeEventListener('mouseover', this.TPostListNodeMouseOver)
  }

  // 前一页
  prev = () => {
    this.props.dispatch({
      type: 'global/queryList',
      payload: { queryType: 'prev' },
    })
  }

  // 后一页
  next = () => {
    this.props.dispatch({
      type: 'global/queryList',
      payload: { queryType: 'next' },
    })
  }

  // 移动端为追加文章
  add = () => {
    this.setState({ disabled: true }, () => {
      this.props.dispatch({
        type: 'global/queryList',
        payload: { queryType: 'add' },
      })
    })
  }

  // 卡片隐藏展示 Loading
  onHide = () => {
    this.setState({ showLoading: true })
  }

  // 获取文章列表 
  getPostListNode = () => {
    if (this.postListNode) return
    this.postListNode = ReactDOM.findDOMNode(this.refs.postList)
    this.TPostListNodeMouseOver = _.throttle(this.postListNodeMouseOver, 400, { trailing: true })
    this.postListNode.addEventListener('mouseover', this.TPostListNodeMouseOver)
  }

  // 监听：文章卡片触发看板娘对话
  postListNodeMouseOver = e => {
    let target
    if (e.target.tagName.toUpperCase() === 'A') {
      target = e.target
    } else if (
      e.target.parentElement &&
      e.target.parentElement.tagName.toUpperCase() === 'A'
    ) {
      target = e.target.parentElement
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement.parentElement &&
      e.target.parentElement.parentElement.tagName.toUpperCase() === 'A'
    ) {
      target = e.target.parentElement.parentElement
    } else {
      return
    }
    const title = target.getAttribute('data-title')
    const tips = `要去看看<font color=#f6f> ${title} </font>吗？`
    this.props.dispatch({
      type: 'global/showTips',
      payload: { tips },
    })
  }

  // 前后翻页触发看板娘对话
  handleMouseOver = type => {
    let tips
    if (type === 'prev') {
      tips = "要到上一页看看吗？(●'◡'●)"
    } else {
      tips = "要到下一页看看吗？(●'◡'●)"
    }
    this.props.dispatch({
      type: 'global/showTips',
      payload: { tips },
    })
  }

  render({ postList, loading }, { showLoading, disabled }) {
    return (
      <div class={cx('container')}>
        <div class={cx('content')}>
          <button
            class={cx('page-btn', 'prev')}
            onClick={this.prev}
            onMouseMove={() => this.handleMouseOver('prev')}
          >
            <i className="fa fa-angle-double-left" aria-hidden="true"></i>
          </button>

          <Transition
            visible={disabled || !loading && !showLoading}
            animation={isMobile ? 'drop' : 'zoom'}
            duration={600}
            onHide={this.onHide}
            onShow={this.getPostListNode}
          >
            <div>
              <div class={cx('post-list')} ref='postList'>
                {postList.map((post, index) => {
                  return (
                    <PostCard
                      key={post.id}
                      {...post}
                      gotoCat={this.gotoCat}
                    />
                  )
                })}
              </div>
            </div>
          </Transition>
          {!disabled && showLoading && <Loading />}

          <button
            class={cx('page-btn', 'next')}
            onClick={this.next}
            onMouseMove={() => this.handleMouseOver('next')}
          >
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
          </button>
          <button class={cx('mobile-btn')} onClick={this.add}>
            <i className="fa fa-angle-double-down" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default connect(({ global, loading }) => ({
  postList: global.postList,
  loading: loading.effects['global/queryList'],
}))(Home)