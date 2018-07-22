/*
 * 文章页
 * @author: 蝉時雨
 * @date: 2018-07-05
 */

import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Gitalk from 'gitalk'
import _ from 'lodash'
import classNames from 'classnames/bind'

import Transition from '../../components/Transition'
import PostBody from '../../components/PostBody'
import PostPV from '../../components/PostPV'
import Loading from '../../components/Loading'
import config from '../../config'
import styles from './index.less'

const { gitalkOption, reward } = config
const cx = classNames.bind(styles)

class Post extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props
    const { number } = match.params
    dispatch({
      type: 'global/queryPost',
      payload: { number },
    })
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, post } = this.props
    if (post.number && +post.number !== +nextProps.match.params.number) {
      dispatch({
        type: 'global/queryPost',
        payload: { number: nextProps.match.params.number },
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/updateState',
      payload: { post: {} },
    })
  }

  // 渲染评论
  renderGitalk = () => {
    const { post } = this.props
    const gitalk = new Gitalk({
      ...gitalkOption,
      title: post.title,
    })
    gitalk.render(`gitalk-${post.id}`)
  }

  render({ post, prevPost, nextPost, loading }) {
    const showLoading = loading || _.isEmpty(post)
    return (
      <div class={cx('container')}>
        <div class={cx('wapper')}>
          <Transition
            visible={!showLoading}
            animation='drop'
            duration={600}
            onShow={this.renderGitalk}
          >
            <div class={cx('post')}>
              <PostBody {...post} />
              <div class={cx('reward')}>
                <span class={cx('reward-icon')}>赏</span>
                <div class={cx('reward-body')}>
                  <ul>
                    {
                      reward.map((o, i) => {
                        return (
                          <li key={i}>
                            <img alt="" src={o.qr} />
                            <span>{o.type}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
              <div class={cx('post-squares')}>
                <PostPV {...prevPost} />
                <PostPV {...nextPost} />
              </div>
            </div>
          </Transition>
          {showLoading && <Loading className={cx('loading')} />}
        </div>
        {!showLoading && post.id && <div id={`gitalk-${post.id}`} />}
      </div>
    )
  }
}

export default connect(({ global, loading }) => {
  const { post, prevPost, nextPost } = global
  return {
    post,
    prevPost,
    nextPost,
    loading: loading.effects['global/queryPost'],
  }
})(Post)