/** 
 * @Author: chenxin 
 * @Date: 2018-07-17 10:28:21 
 * @Last Modified by: chenxin
 * @Last Modified time: 2018-08-27 14:02:53
 * @Description: 书单
 */

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

const { gitalkOption, booksOption, qoutes } = config
const { enableGitalk } = booksOption
const cx = classNames.bind(styles)

class Books extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
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
      payload: { books: {} },
    })
  }

  // 渲染评论
  renderGitalk = () => {
    if (enableGitalk) {
      const gitalk = new Gitalk({
        ...gitalkOption,
        title: '书单',
      })
      gitalk.render('gitalk')
    }
  }

  render({ books, loading }, { showLoading }) {
    const section = books.body &&
      books.body.split('## ').filter(o => o.length).map(o => {
        const content = o.split('\r\n').filter(o => o.length)
        return {
          name: content[0],
          author: content[1].split('author:')[1],
          published: content[2].split('published:')[1],
          progress: content[3].split('progress:')[1],
          rating: content[4].split('rating:')[1],
          postTitle: content[5].split('postTitle:')[1],
          postLink: content[6].split('postLink:')[1],
          cover: content[7].split('cover:')[1],
          link: content[8].split('link:')[1],
          desc: content[9].split('desc:')[1],
        }
      })

    return (
      <div class={cx('container')}>
        <Transition
          visible={!loading && !showLoading}
          animation='drop'
          duration={600}
          onShow={this.renderGitalk}
        >
          <div class={cx('body')}>
            <Quote text={qoutes.books} />
            <div class={cx('content')}>
              {section && section.map((o, i) => {
                const { name, author, published, progress, rating, postTitle, postLink, cover, link, desc } = o
                const rateList = new Array(10).fill(1).map((o, i) => {
                  return (<i key={i} className={'fa fa-star'} style={{ color: i <= 4 && '#f6f' }} aria-hidden="true"></i>)
                })
                const rate = [].slice.call(rateList, 5 - parseInt(rating, 10), 10 - parseInt(rating, 10))
                return (
                  <div key={i} class={cx('book')}>
                    <h2>{name}</h2>
                    <div class={cx('header')}>
                      <img alt="" src={cover} />
                      <div class={cx('info')}>
                        <a href={link} rel="noopener noreferrer" target="_blank">
                          <i className="fa fa-external-link" aria-hidden="true"></i>
                          <h2>{name}</h2>
                        </a>
                        <p>作者：{author}</p>
                        <p>出版时间：{published}</p>
                        <p>阅读进度：{progress}</p>
                        <p>
                          读书笔记：
                        {!!(postLink.trim().length) ? (
                            <a href={postLink} rel="noopener noreferrer" target="_blank">
                              {postTitle}
                            </a>
                          ) : ('暂无')}
                        </p>
                        <p>
                          推荐指数：{rate}
                        </p>
                      </div>
                    </div>
                    <div class={cx('desc')}>{desc}</div>
                  </div>
                )
              })}
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
  books: global.books,
  loading: loading.effects['global/queryPage']
}))(Books)