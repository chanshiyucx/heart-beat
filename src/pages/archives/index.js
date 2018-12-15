import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Gitalk from 'gitalk'
import classNames from 'classnames/bind'

import Transition from '../../components/Transition'
import Loading from '../../components/Loading'
import Archive from '../../components/Archive'
import Quote from '../../components/Quote'
import config from '../../config'
import styles from './index.less'

const { gitalkOption, archivesOption, themeColors } = config
const { enableGitalk, qoute } = archivesOption
const cx = classNames.bind(styles)
const colors = _.shuffle(themeColors)

class Archives extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      renderGitalk: false
    }
  }

  componentDidMount() {
    this.next()
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/updateState',
      payload: { archives: [] }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.archives.length) {
      this.setState({ showLoading: false })
    }
  }

  // 前一页
  prev = () => {
    this.props.dispatch({
      type: 'global/queryArchives',
      payload: { queryType: 'prev' }
    })
  }

  // 后一页
  next = () => {
    this.props.dispatch({
      type: 'global/queryArchives',
      payload: { queryType: 'next' }
    })
  }

  // 卡片隐藏展示 Loading
  onHide = () => {
    this.setState({ showLoading: true })
  }

  // 渲染评论
  renderGitalk = () => {
    if (enableGitalk && !this.state.renderGitalk) {
      setTimeout(() => {
        const gitalk = new Gitalk({
          ...gitalkOption,
          title: '归档'
        })
        gitalk.render('gitalk')
      }, 100)
      this.setState({ renderGitalk: true })
    }
  }

  render({ totalList, archives, loading }, { showLoading }) {
    const index = archives.length && totalList.findIndex(o => o.id === archives[0].id)
    const page = index / 12 + 1
    const maxPage = Math.ceil(totalList.length / 12)

    return (
      <div class={cx('container')}>
        <Transition
          visible={!loading && !showLoading}
          animation="drop"
          duration={600}
          onHide={this.onHide}
          onShow={this.renderGitalk}
        >
          <div class={cx('body')}>
            <Quote text={qoute} />
            <div class={cx('content')}>
              {archives.map((o, i) => {
                const color = colors[i]
                return <Archive key={i} color={color} {...o} />
              })}
            </div>
            <div class={cx('pagination')}>
              <button disabled={page <= 1} class={cx('prevBtn')} onClick={this.prev}>
                前一页
              </button>
              <span>{page}</span>
              <button disabled={page >= maxPage} class={cx('nextBtn')} onClick={this.next}>
                后一页
              </button>
            </div>
          </div>
        </Transition>

        {enableGitalk && <div id="gitalk" />}
        {showLoading && <Loading className={cx('loading')} />}
      </div>
    )
  }
}

export default connect(({ global, loading }) => ({
  totalList: global.totalList,
  archives: global.archives,
  loading: loading.effects['global/queryArchives']
}))(Archives)
