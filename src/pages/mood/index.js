import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Gitalk from 'gitalk'
import classNames from 'classnames/bind'

import { Transition, Segment, Pagination, Quote, Loading } from '../../components'
import config from '../../config'
import styles from './index.less'

const { gitalkOption, moodOption, themeColors } = config
const { enableGitalk, qoute } = moodOption
const cx = classNames.bind(styles)
const colors = _.shuffle(themeColors)

class Mood extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      renderGitalk: false,
      mood: [],
      currList: [],
      pageSize: 10,
      page: 1,
      maxPage: 1
    }
  }

  componentDidMount() {
    this.queryMood()
  }

  // 获取心情列表
  queryMood() {
    this.props
      .dispatch({
        type: 'app/queryMood'
      })
      .then(v => {
        const currList = v.slice(0, this.state.pageSize)
        const maxPage = Math.ceil(v.length / this.state.pageSize)
        this.setState({
          showLoading: false,
          mood: v,
          currList,
          page: 1,
          maxPage
        })
      })
      .catch(console.error)
  }

  // 前一页
  prev = () => {
    const { mood, page, pageSize } = this.state
    const prevPage = page - 1
    const currList = mood.slice((prevPage - 1) * pageSize, (page - 1) * pageSize)
    this.setState({
      currList,
      page: prevPage
    })
  }

  // 后一页
  next = () => {
    const { mood, page, pageSize } = this.state
    const nextPage = page + 1
    const currList = mood.slice(page * pageSize, nextPage * pageSize)
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
          title: '心情'
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

export default connect(() => ({}))(Mood)
