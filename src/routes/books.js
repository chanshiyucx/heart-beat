import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Rating, Icon } from 'semantic-ui-react'
import Gitalk from 'gitalk'

import Quote from '../components/quote'
import Loading from '../components/loading'

import config from '../config'
const { gitalkOptions, duration, transitions, qoutes, booksOptions } = config
const { enableGitalk, books } = booksOptions

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  padding: 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  background: rgba(255, 255, 255, .6);
`

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 700px) {
    justify-content: space-around;
  }
`

const Book = styled.div`
  display: inline-block;
  margin: 6px 0;
  width: 49%;
  border-radius: 3px;
  background: rgba(255, 255, 255, .4);
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.16);
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier(.6, .2, .1, 1) 0s, opacity 0.5s cubic-bezier(.6, .2, .1, 1) 0s!important;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2), 0 6px 6px rgba(0, 0, 0, .24)!important;
    transform: translateY(-4px);
    a {
      color: #faf;
    }
  }
  @media (max-width: 700px) {
    width: 96%;
  }
`

const Header = styled.div`
  padding: 12px 16px 0;
  display: flex;
  justify-content: flex-start;
  img {
    width: 120px;
    height: 160px;
    margin-right: 16px;
    box-shadow: 4px 6px 10px rgba(0, 0, 0, .2);
  }
`

const Desc = styled.p`
  padding: 12px 16px;
  line-height: 1.6;
  overflow: hidden;
`

const Info = styled.div`
  a {
    display: flex;
    align-items: center;
    padding: 6px 0;
  }
  p {
    margin-top: 5px;
  }
  p:first-child {
    margin-top: 10px;
  }
`

const Extra = styled.div`
  margin-top: 5px;
`

class Books extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/showBook',
    })

    if (enableGitalk) {
      const gitalk = new Gitalk({
        ...gitalkOptions,
        title: '书单'
      })
      // 渲染评论
      gitalk.render('gitalk')
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'site/reset',
      payload: {
        showBook: false,
      }
    })
  }

  renderBook = () => {
    if (books && books.length > 0) {
      const bookList = books.map((o, i) => {
        const { name, author, published, progress, rating, post, cover, link, desc } = o
        return (
          <Book key={i}>
            <Header>
              <img alt="" src={cover} />
              <Info>
                <a href={link} target="_blank">
                  <Icon name="external" size="large" />
                  <h3>{name}</h3>
                </a>
                <p>作者：{author}</p>
                <p>出版时间：{published}</p>
                <p>阅读进度：{progress}</p>
                <p>读书笔记：
                  {Object.keys(post).length > 0
                    ? <a href={post.link} target="_blank">{post.name}</a>
                    : '暂无'
                  }
                </p>
                <Extra>推荐指数：
                  <Rating disabled maxRating={5} defaultRating={rating} icon='star' size='large' />
                </Extra>
              </Info>
            </Header>
            <Desc>
              {desc}
            </Desc>
          </Book>
        )
      })
      return bookList
    }
  }

  render() {
    const { showBook } = this.props
    return (
      <Container>
        <div>
          <Transition visible={showBook} animation={transitions.page || 'drop'} duration={duration}>
            <Wapper>
              <Quote text={qoutes.books} />
              <BookList>
                {this.renderBook()}
              </BookList>
            </Wapper>
          </Transition>
          {!showBook &&
            <Loading />
          }
        </div>
        {enableGitalk && <div id='gitalk'></div>}
      </Container>
    )
  }
}

export default connect(({ site }) => ({ ...site }))(Books)
