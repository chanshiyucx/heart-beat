import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Gitalk from 'gitalk'
import classNames from 'classnames/bind'

import { Transition, Segment, Pagination, Quote, Loading } from '../../components'
import config from '../../config'
import styles from './index.less'

const { gitalkOption, inspirationOption, themeColors } = config
const { enableGitalk, qoute } = inspirationOption
const cx = classNames.bind(styles)
const colors = _.shuffle(themeColors)

class Inspiration extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      renderGitalk: false,
      inspiration: [],
      currList: [],
      pageSize: 10,
      page: 1,
      maxPage: 1
    }
  }

  componentDidMount() {
    this.queryInspiration()
  }

  // 获取灵感列表
  queryInspiration() {
    this.props
      .dispatch({
        type: 'app/queryInspiration'
      })
      .then(v => {
        const currList = v.slice(0, this.state.pageSize)
        const maxPage = Math.ceil(v.length / this.state.pageSize)
        this.setState({
          showLoading: false,
          inspiration: v,
          currList,
          page: 1,
          maxPage
        })
      })
      .catch(console.error)
  }

  // 前一页
  prev = () => {
    const { inspiration, page, pageSize } = this.state
    const prevPage = page - 1
    const currList = inspiration.slice((prevPage - 1) * pageSize, (page - 1) * pageSize)
    this.setState({
      currList,
      page: prevPage
    })
  }

  // 后一页
  next = () => {
    const { inspiration, page, pageSize } = this.state
    const nextPage = page + 1
    const currList = inspiration.slice(page * pageSize, nextPage * pageSize)
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
          title: '灵感'
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
                const date = o.created_at.slice(0, 10)
                const color = colors[i]
                return <Segment key={o.id} color={color} title={date} content={o.body} />
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

export default connect(() => ({}))(Inspiration)
