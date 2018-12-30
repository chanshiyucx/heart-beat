import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Gitalk from 'gitalk'
import _ from 'lodash'
import classNames from 'classnames/bind'

import { Transition, PostBody, PostPV, Reward, Loading } from '../../components'
import config from '../../config'
import styles from './index.less'

const { gitalkOption } = config
const cx = classNames.bind(styles)

class Post extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props
    const { number } = match.params
    dispatch({
      type: 'app/queryPost',
      payload: { number }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, post } = this.props
    if (post.number && +post.number !== +nextProps.match.params.number) {
      dispatch({
        type: 'app/queryPost',
        payload: { number: nextProps.match.params.number }
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        post: {}
      }
    })
  }

  // 渲染评论
  renderGitalk = () => {
    const { post } = this.props
    const gitalk = new Gitalk({
      ...gitalkOption,
      title: post.title
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
            animation="drop"
            duration={600}
            onShow={this.renderGitalk}
          >
            <div class={cx('post')}>
              <PostBody {...post} />
              <Reward />
              <div class={cx('lincenses')}>
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  署名-非商业性使用-相同方式共享 4.0 国际
                </a>
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

export default connect(({ app, loading }) => {
  const { post, prevPost, nextPost } = app
  return {
    post,
    prevPost,
    nextPost,
    loading: loading.effects['app/queryPost']
  }
})(Post)
