import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Gitalk from 'gitalk'
import classNames from 'classnames/bind'

import { Transition, Archive, Pagination, Quote, Loading } from '../../components'
import config from '../../config'
import styles from './index.less'

const { gitalkOption, tagsOption, themeColors } = config
const { enableGitalk, qoute } = tagsOption
const cx = classNames.bind(styles)
const colors = _.shuffle(themeColors)

class Tags extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      renderGitalk: false,
      filterTitle: '',
      filterPost: [],
      currList: [],
      pageSize: 10,
      page: 1,
      maxPage: 1
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'global/queryTags'
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.tags.length) {
      this.setState({ showLoading: false })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/updateState',
      payload: { tags: [] }
    })
  }

  // 筛选文章
  filterPost = tag => {
    this.props
      .dispatch({
        type: 'global/filterPost',
        payload: {
          type: 'labels',
          filter: tag
        }
      })
      .then(v => {
        const currList = v.slice(0, this.state.pageSize)
        const maxPage = Math.ceil(v.length / this.state.pageSize)
        this.setState({
          filterTitle: tag,
          filterPost: v,
          currList,
          page: 1,
          maxPage
        })
      })
      .catch(console.error)
  }

  // 清空文章
  clearFilter = () => {
    this.setState({
      filterTitle: '',
      filterPost: [],
      currList: [],
      page: 1,
      maxPage: 1
    })
  }

  // 前一页
  prev = () => {
    const { filterPost, page, pageSize } = this.state
    const prevPage = page - 1
    const currList = filterPost.slice((prevPage - 1) * pageSize, (page - 1) * pageSize)
    this.setState({
      currList,
      page: prevPage
    })
  }

  // 后一页
  next = () => {
    const { filterPost, page, pageSize } = this.state
    const nextPage = page + 1
    const currList = filterPost.slice(page * pageSize, nextPage * pageSize)
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
          title: '标签'
        })
        gitalk.render('gitalk')
      }, 100)
      this.setState({ renderGitalk: true })
    }
  }

  render({ tags, loading }, { showLoading, filterTitle, currList, page, maxPage }) {
    return (
      <div class={cx('container')}>
        <Transition
          visible={!loading && !showLoading}
          animation="drop"
          duration={600}
          onShow={this.renderGitalk}
        >
          <div class={cx('body')}>
            <Quote text={qoute} />
            <div class={cx('content')}>
              {tags.map((o, i) => {
                const color = colors[i % colors.length]
                return (
                  <button key={i} style={{ color }} onClick={() => this.filterPost(o.name)}>
                    {o.name}
                  </button>
                )
              })}
            </div>
            <Transition visible={currList.length} animation="fade down" duration={600}>
              <div class={cx('filter-post')}>
                <div>
                  <span>Tag:</span>
                  <button class={cx('menu-btn')} onClick={this.clearFilter}>
                    {filterTitle}
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                </div>
                <div class={cx('content')}>
                  {currList.map((o, i) => {
                    const color = colors[i]
                    return <Archive key={i} color={color} {...o} />
                  })}
                </div>
                <Pagination prev={this.prev} next={this.next} page={page} maxPage={maxPage} />
              </div>
            </Transition>
          </div>
        </Transition>

        {enableGitalk && <div id="gitalk" />}
        {showLoading && <Loading className={cx('loading')} />}
      </div>
    )
  }
}

export default connect(({ global, loading }) => ({
  tags: global.tags,
  loading: loading.effects['global/queryTags']
}))(Tags)
