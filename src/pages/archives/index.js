import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Gitalk from 'gitalk'
import classNames from 'classnames/bind'

import Transition from '../../components/Transition'
import Loading from '../../components/Loading'
import Archive from '../../components/Archive'
import Quote from '../../components/Quote'
import Pagination from '../../components/Pagination'
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
      renderGitalk: false,
      archives: [],
      currList: [],
      pageSize: 12,
      page: 1,
      maxPage: 1
    }
  }

  componentDidMount() {
    this.queryArchives()
  }

  // 获取文章列表
  queryArchives() {
    this.props
      .dispatch({
        type: 'global/queryArchives'
      })
      .then(v => {
        const currList = v.slice(0, this.state.pageSize)
        const maxPage = Math.ceil(v.length / this.state.pageSize)
        this.setState({
          showLoading: false,
          archives: v,
          currList,
          page: 1,
          maxPage
        })
      })
      .catch(console.error)
  }

  // 前一页
  prev = () => {
    const { archives, page, pageSize } = this.state
    const prevPage = page - 1
    const currList = archives.slice((prevPage - 1) * pageSize, (page - 1) * pageSize)
    this.setState({
      currList,
      page: prevPage
    })
  }

  // 后一页
  next = () => {
    const { archives, page, pageSize } = this.state
    const nextPage = page + 1
    const currList = archives.slice(page * pageSize, nextPage * pageSize)
    this.setState({
      currList,
      page: nextPage
    })
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

  render({}, { showLoading, currList, page, maxPage }) {
    return (
      <div class={cx('container')}>
        <Transition
          visible={!showLoading}
          animation="drop"
          duration={600}
          onShow={this.renderGitalk}
        >
          <div class={cx('body')}>
            <Quote text={qoute} />
            <div class={cx('content')}>
              {currList.map((o, i) => {
                const color = colors[i]
                return <Archive key={i} color={color} {...o} />
              })}
            </div>
            <Pagination prev={this.prev} next={this.next} page={page} maxPage={maxPage} />
          </div>
        </Transition>

        {enableGitalk && <div id="gitalk" />}
        {showLoading && <Loading className={cx('loading')} />}
      </div>
    )
  }
}

export default connect(() => ({}))(Archives)
