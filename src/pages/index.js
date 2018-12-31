import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import classNames from 'classnames/bind'

import { Transition, PostCard, Loading } from '../components'
import { isMobile, on } from '../utils'
import styles from './index.less'

const cx = classNames.bind(styles)

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      disabledGif: false,
      addEventListener: false
    }
  }

  componentDidMount() {
    this.queryList(this.props.postList.length ? '' : 'next')
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.postList.length) {
      this.setState({ showLoading: false })
    }
  }

  queryList = queryType => {
    if (this.props.loading) return
    this.props.dispatch({
      type: 'app/queryList',
      payload: { queryType }
    })
  }

  // 卡片隐藏展示 Loading
  onHide = () => {
    this.setState({ showLoading: true })
  }

  // 获取文章列表
  getPostListNode = () => {
    // 对于移动端只展示第一次动画
    if (isMobile) {
      this.setState({ disabledGif: true })
    }
    if (this.state.addEventListener) return
    this.setState({ addEventListener: true })
    this.TPostListNodeMouseOver = _.throttle(this.postListNodeMouseOver, 400, { trailing: true })
    on(this.postListNode, 'mouseover', this.TPostListNodeMouseOver)
  }

  // 监听：文章卡片触发看板娘对话
  postListNodeMouseOver = e => {
    let target
    if (e.target.tagName.toUpperCase() === 'A') {
      target = e.target
    } else if (e.target.parentElement && e.target.parentElement.tagName.toUpperCase() === 'A') {
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
      type: 'app/showTips',
      payload: { tips }
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
      type: 'app/showTips',
      payload: { tips }
    })
  }

  render({ totalList, postList, loading }, { showLoading, disabledGif }) {
    return (
      <div class={cx('container')}>
        <div class={cx('content')}>
          <button
            class={cx('page-btn', 'prev')}
            onClick={() => this.queryList('prev')}
            onMouseMove={() => this.handleMouseOver('prev')}
          >
            <i class="icon">&#xf100;</i>
          </button>

          <Transition
            visible={!loading && !showLoading}
            animation={isMobile ? (disabledGif ? '' : 'drop') : 'zoom'}
            duration={600}
            onHide={this.onHide}
            onShow={this.getPostListNode}
          >
            <div>
              <div class={cx('post-list')} ref={c => (this.postListNode = c)}>
                {postList.map(post => {
                  return <PostCard key={post.id} {...post} gotoCat={this.gotoCat} />
                })}
              </div>
            </div>
          </Transition>
          {showLoading && !disabledGif && <Loading />}

          <button
            class={cx('page-btn', 'next')}
            onClick={() => this.queryList('next')}
            onMouseMove={() => this.handleMouseOver('next')}
          >
            <i class="icon">&#xf101;</i>
          </button>
          {totalList.length !== postList.length && (
            <button class={cx('mobile-btn')} onClick={() => this.queryList('add')}>
              <i class="icon">&#xf103;</i>
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default connect(({ app, loading }) => ({
  totalList: app.totalList,
  postList: app.postList,
  loading: loading.effects['app/queryList']
}))(Home)
