/** 
 * @Author: chenxin 
 * @Date: 2018-07-17 10:24:44 
 * @Last Modified by: chenxin
 * @Last Modified time: 2018-08-27 10:26:37
 * @Description: 说说
 */ 

import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Gitalk from 'gitalk'
import classNames from 'classnames/bind'

import Transition from '../../components/Transition'
import Loading from '../../components/Loading'
import Quote from '../../components/Quote'
import Segment from '../../components/Segment'
import config from '../../config'
import styles from './index.less'

const { gitalkOption, shuoshuoOption, qoutes, themeColors } = config
const { enableGitalk } = shuoshuoOption
const cx = classNames.bind(styles)
const colors = _.shuffle(themeColors)

class ShuoShuo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      renderGitalk: false,
    }
  }

  componentDidMount() {
    this.next()

    if (enableGitalk) {
      const gitalk = new Gitalk({
        ...gitalkOption,
        title: '说说',
      })
      gitalk.render('gitalk')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.shuoshuo.length) {
      this.setState({ showLoading: false })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/updateState',
      payload: { shuoshuo: [] },
    })
  }

  // 前一页
  prev = () => {
    this.props.dispatch({
      type: 'global/queryShuoShuo',
      payload: { queryType: 'prev' },
    })
  }

  // 后一页
  next = () => {
    this.props.dispatch({
      type: 'global/queryShuoShuo',
      payload: { queryType: 'next' },
    })
  }

  // 卡片隐藏展示 Loading
  onHide = () => {
    this.setState({ showLoading: true })
  }

  // 渲染评论
  renderGitalk = () => {
    if (!this.state.renderGitalk) {
      this.setState({ renderGitalk: true }, () => {
        if (enableGitalk) {
          const gitalk = new Gitalk({
            ...gitalkOption,
            title: '说说',
          })
          gitalk.render('gitalk')
        }
      })
    }
  }

  render({ totalShuoShuo, shuoshuo, loading }, { showLoading }) {
    const index = shuoshuo.length && totalShuoShuo.findIndex(o => o.id === shuoshuo[0].id)
    const page = index / 6 + 1
    const maxPage = Math.ceil(totalShuoShuo.length / 6)

    return (
      <div class={cx('container')}>
        <Transition
          visible={!loading && !showLoading}
          animation='drop'
          duration={600}
          onHide={this.onHide}
          onShow={this.renderGitalk}
        >
          <div class={cx('body')}>
            <Quote text={qoutes.shuoshuo} />
            <div class={cx('content')}>
              {shuoshuo.map((o, i) => {
                const date = o.created_at.slice(0, 10)
                const color = colors[i]
                return (
                  <Segment key={o.id} color={color} title={date} content={o.body} />
                )
              })}
            </div>
            <div class={cx('pagination')}>
              <button
                disabled={page <= 1}
                class={cx('prevBtn')}
                onClick={this.prev}
              >
                前一页
              </button>
              <span>{page}</span>
              <button
                disabled={page >= maxPage}
                class={cx('nextBtn')}
                onClick={this.next}
              >
                后一页
              </button>
            </div>
          </div>
        </Transition>
        {enableGitalk && <div id='gitalk' />}
        {showLoading && <Loading className={cx('loading')} />}
      </div>
    )
  }
}

export default connect(({ global, loading }) => ({
  totalShuoShuo: global.totalShuoShuo,
  shuoshuo: global.shuoshuo,
  loading: loading.effects['global/queryShuoShuo'],
}))(ShuoShuo)