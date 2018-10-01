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
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'global/queryTags',
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
      payload: { tags: [] },
    })
  }

  // 筛选文章
  filterPost = tag => {
    this.props.dispatch({
      type: 'global/filterPost',
      payload: {
        type: 'labels',
        filter: tag,
      },
    }).then(v => {
      this.setState({
        filterTitle: tag,
        filterPost: v,
      })
    }).catch(console.error)
  }

  // 清空文章
  clearFilter = () => {
    this.setState({
      filterTitle: '',
      filterPost: [],
    })
  }

  // 渲染评论
  renderGitalk = () => {
    if (enableGitalk && !this.state.renderGitalk) {
      setTimeout(() => {
        const gitalk = new Gitalk({
          ...gitalkOption,
          title: '标签',
        })
        gitalk.render('gitalk')
      }, 100)
      this.setState({ renderGitalk: true })
    }
  }

  render({ tags, loading }, { showLoading, filterTitle, filterPost }) {
    return (
      <div class={cx('container')}>
        <Transition
          visible={!loading && !showLoading}
          animation='drop'
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
            <Transition
              visible={filterPost.length}
              animation='fade down'
              duration={600}
            >
              <div class={cx('filter-post')}>
                <div>
                  <span>Tag:</span>
                  <button onClick={this.clearFilter}>
                    {filterTitle}
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>
                <div class={cx('content')}>
                  {filterPost.map((o, i) => {
                    const color = colors[i]
                    return (<Archive key={i} color={color} {...o} />)
                  })}
                </div>
              </div>
            </Transition>
          </div>
        </Transition>

        {enableGitalk && <div id='gitalk' />}
        {showLoading && <Loading className={cx('loading')} />}
      </div>
    )
  }
}

export default connect(({ global, loading }) => ({
  tags: global.tags,
  loading: loading.effects['global/queryTags']
}))(Tags)
