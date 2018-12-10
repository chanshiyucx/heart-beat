import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Gitalk from 'gitalk'
import classNames from 'classnames/bind'

import Transition from '../../components/Transition'
import Loading from '../../components/Loading'
import Quote from '../../components/Quote'
import config from '../../config'
import styles from './index.less'

const { gitalkOption, booksOption } = config
const { enableGitalk, qoute } = booksOption
const cx = classNames.bind(styles)

class Books extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      renderGitalk: false
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'global/queryPage',
      payload: { type: 'books' }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !_.isEmpty(nextProps.books)) {
      this.setState({ showLoading: false })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/updateState',
      payload: { books: {} }
    })
  }

  // 渲染评论
  renderGitalk = () => {
    if (enableGitalk) {
      setTimeout(() => {
        const gitalk = new Gitalk({
          ...gitalkOption,
          title: '书单'
        })
        gitalk.render('gitalk')
      }, 100)
      this.setState({ renderGitalk: true })
    }
  }

  render({ books, loading }, { showLoading }) {
    const section =
      books.body &&
      books.body
        .trim()
        .split('## ')
        .filter(o => o.length)
        .map(o => {
          const content = o.split('\r\n').filter(o => o.length)
          return {
            name: content[0],
            author: content[1].split('author:')[1].trim(),
            published: content[2].split('published:')[1].trim(),
            progress: content[3].split('progress:')[1].trim(),
            rating: content[4].split('rating:')[1].trim(),
            postTitle: content[5].split('postTitle:')[1].trim(),
            postLink: content[6].split('postLink:')[1].trim(),
            cover: content[7].split('cover:')[1].trim(),
            desc: content[9].split('desc:')[1].trim()
          }
        })

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
              {section &&
                section.map((o, i) => {
                  const {
                    name,
                    author,
                    published,
                    progress,
                    rating,
                    postTitle,
                    postLink,
                    cover,
                    desc
                  } = o
                  const rateList = new Array(10).fill(1).map((o, i) => {
                    return (
                      <i
                        key={i}
                        className={'fa fa-star'}
                        style={{ color: i <= 4 && '#f6f' }}
                        aria-hidden="true"
                      />
                    )
                  })
                  const rate = [].slice.call(
                    rateList,
                    5 - parseInt(rating, 10),
                    10 - parseInt(rating, 10)
                  )
                  return (
                    <div key={i} class={cx('book')}>
                      <h2>{name}</h2>
                      <div class={cx('header')}>
                        <img alt="" src={cover} />
                        <div class={cx('info')}>
                          <h2>{name}</h2>
                          <p>作者：{author}</p>
                          <p>出版时间：{published}</p>
                          <p>阅读进度：{progress}</p>
                          <p>
                            读书笔记：
                            {!!postLink.trim().length ? (
                              <a
                                href={postLink}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {postTitle}
                              </a>
                            ) : (
                              '暂无'
                            )}
                          </p>
                          <p>推荐指数：{rate}</p>
                        </div>
                      </div>
                      <div class={cx('desc')}>{desc}</div>
                    </div>
                  )
                })}
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
  books: global.books,
  loading: loading.effects['global/queryPage']
}))(Books)
