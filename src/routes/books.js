import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import Gitalk from 'gitalk'

import { Book, Quote, Loading } from '../components'
import config from '../config'

const { gitalkOptions, duration, transitions, qoutes, booksOptions } = config
const { enableGitalk } = booksOptions

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  display: ${props => props.onShow ? 'block' : 'none'};
  padding: .16rem;
  border-radius: .03rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  background: rgba(255, 255, 255, .6);
  animation-duration: ${duration / 1000}s;
  animation-fill-mode: forwards;
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

class Books extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'page/queryPage',
      payload: {
        type: 'books',
      },
    })

    if (enableGitalk) {
      const gitalk = new Gitalk({
        ...gitalkOptions,
        title: '书单',
      })
      // 渲染评论
      gitalk.render('gitalk')
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        books: {},
      },
    })
  }

  render() {
    const { books } = this.props
    const section = !!Object.keys(books).length && books.body &&
                    books.body.split('## ').filter((o) => o.length > 0).map((o) => {
                      const content = o.split('\r\n').filter((o) => o.length > 0)
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
    const showBooks = !!section.length
    return (
      <Container>
        <Wapper
          onShow={showBooks}
          className={showBooks ? transitions.page.show : ''}
        >
          <Quote text={qoutes.books} />
          <BookList>
            {showBooks &&
              section.map((o, i) => {
                return (
                  <Book key={i} book={o} />
                )
              })
            }
          </BookList>
        </Wapper>
        {!showBooks && <Loading />}

        {enableGitalk && <div id="gitalk" />}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(Books)
