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

const { gitalkOption, catsOption, themeColors } = config
const { enableGitalk, qoute, list } = catsOption
const cx = classNames.bind(styles)
const colors = _.shuffle(themeColors)

class Categories extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      renderGitalk: false,
      filterTitle: '',
      filterPost: []
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'global/queryCats'
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.cats.length) {
      this.setState({ showLoading: false })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/updateState',
      payload: { cats: [] }
    })
  }

  // 筛选文章
  filterPost = cat => {
    this.props
      .dispatch({
        type: 'global/filterPost',
        payload: {
          type: 'milestone',
          filter: cat.number
        }
      })
      .then(v => {
        this.setState({
          filterTitle: cat.title,
          filterPost: v
        })
      })
      .catch(console.error)
  }

  // 清空文章
  clearFilter = () => {
    this.setState({
      filterTitle: '',
      filterPost: []
    })
  }

  // 渲染评论
  renderGitalk = () => {
    if (enableGitalk && !this.state.renderGitalk) {
      setTimeout(() => {
        const gitalk = new Gitalk({
          ...gitalkOption,
          title: '分类'
        })
        gitalk.render('gitalk')
      }, 100)
      this.setState({ renderGitalk: true })
    }
  }

  render({ cats, loading }, { showLoading, filterTitle, filterPost }) {
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
              {cats.map((o, i) => {
                const info = list.find(cat => cat.name === o.title)
                const catText = info.text
                const catImg = info.img
                return (
                  <div
                    key={i}
                    class={cx('cat')}
                    onClick={() => {
                      this.filterPost(o)
                    }}
                  >
                    <img class={cx('bg')} src={catImg} alt="" />
                    <div class={cx('meta')}>
                      <div class={cx('header')}>
                        <img class={cx('avatar')} src={catImg} alt="" />
                        <span>
                          {o.title} ({o.open_issues})
                        </span>
                      </div>
                      <p class={cx('desc')}>{catText}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Transition visible={filterPost.length} animation="fade down" duration={600}>
              <div>
                <div>
                  <span>Category:</span>
                  <button onClick={this.clearFilter}>
                    {filterTitle}
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                </div>
                <div class={cx('content')}>
                  {filterPost.map((o, i) => {
                    const color = colors[i]
                    return <Archive key={i} color={color} {...o} />
                  })}
                </div>
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
  cats: global.cats,
  loading: loading.effects['global/queryCats']
}))(Categories)
