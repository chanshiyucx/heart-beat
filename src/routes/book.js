import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Item } from 'semantic-ui-react'

import Quote from '../components/quote'
import Loading from '../components/loading'

import config from '../config'
const { duration, book } = config

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

const BookList = styled(Item.Group)`
  width: 100%;
`

const StyledItem = styled(Item)`
  padding: 12px 10px!important;
  border-radius: 3px!important;
  background: rgba(255, 255, 255, .4)!important;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.16)!important;
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier(.6, .2, .1, 1) 0s, opacity 0.5s cubic-bezier(.6, .2, .1, 1) 0s!important;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2), 0 6px 6px rgba(0, 0, 0, .24)!important;
    transform: translateY(-4px);
    a {
      color: #faf!important;
      transition: all 0.6s ease!important;
    }
  }
  a {
    color: #666!important;
  }
  img {
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }
`

const StyledDescription = styled(Item.Description)`
  color: #666!important;
`

class Book extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/showBook',
    })
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
    if (book && book.length > 0) {
      const bookList = book.map((o, i) => {
        const { name, author, progress, cover, link, desc, } = o
        return (
          <StyledItem key={i}>
            <Item.Image size='tiny' src={cover} />
            <Item.Content>
              <Item.Header as='a' href={link} target="_blank">{name} </Item.Header>
              <Item.Meta>{author} | {progress}</Item.Meta>
              <StyledDescription>
                {desc}
              </StyledDescription>
            </Item.Content>
          </StyledItem>
        )
      })
      return bookList
    }
  }

  render() {
    const { showBook } = this.props
    const text = '吾生也有涯，而知也无涯'
    return (
      <Container>
        <Transition visible={showBook} animation='drop' duration={duration}>
          <Wapper>
            <Quote text={text} />
            <BookList>
              {this.renderBook()}
            </BookList>
          </Wapper>
        </Transition>
        {!showBook &&
          <Loading />
        }
      </Container>
    )
  }
}

export default connect(({ site }) => ({ ...site }))(Book)
