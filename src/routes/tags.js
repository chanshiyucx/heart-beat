import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition } from 'semantic-ui-react'

import { Archive, Quote, Loading } from '../components'
import { shuffle } from '../utils'
import { colors } from '../theme'
import config from '../config'

const { duration, transitions, qoutes } = config
const newColors = shuffle(colors)

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
  background: rgba(255, 255, 255, 0.6);
`

const Button = styled.button`
  margin: 0 .04rem .1rem;
  padding: .08rem .12rem;
  font-size: .14rem;
  text-align: center;
  text-decoration: none;
  outline: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  border: none;
  border-radius: .03rem;
  background: rgba(0, 0, 0, .12);
  &:hover {
    background: rgba(0, 0, 0, .2);
  }
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const Tag = Button.extend`
  color: ${props => props.color || '#fff'};
`

const CloseBtn = Button.extend`
  color: ${props => props.color || '#666'};
  i {
    color: #f6f;
    margin-left: .06rem;
  }
`

const Title = styled.div`
  h2 {
    display: inline-block;
    margin-right: .12rem;
    font-size: .2rem;
    font-weight: 700;;
  }
`

const ArchiveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 700px) {
    justify-content: space-around;
  }
`

class Tags extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'page/queryTags',
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        tags: [],
        tagsOnHide: false,
        filterTitle: '',
        filterPost: [],
      },
    })
  }

  filterPost = tag => {
    this.props.dispatch({
      type: 'page/filterPost',
      payload: {
        type: 'labels',
        filter: tag,
        filterTitle: tag,
      },
    })
  }

  clearFilter = () => {
    this.props.dispatch({
      type: 'page/update',
      payload: {
        tagsOnHide: false,
        filterTitle: '',
        filterPost: [],
      },
    })
  }

  onHide = () => {
    this.props.dispatch({
      type: 'page/update',
      payload: {
        tagsOnHide: true,
      },
    })
  }

  render() {
    const { tags, tagsOnHide, filterTitle, filterPost } = this.props
    return (
      <Container>
        <Transition
          visible={tags.length > 0 && !filterTitle}
          animation="drop"
          duration={duration}
          onHide={this.onHide}
        >
          <Wapper>
            <Quote text={qoutes.tags} />
            <TagList>
              {
                tags.map((o, i) => {
                  const color = newColors[i % newColors.length]
                  return (
                    <Tag key={o.id} color={color} onClick={() => this.filterPost(o.name)}>
                      {o.name}
                    </Tag>
                  )
                })
              }
            </TagList>
          </Wapper>
        </Transition>
        <Transition
          visible={tagsOnHide && !!filterTitle}
          animation={transitions.page || 'drop'}
          duration={duration}
        >
          <Wapper>
            <Title>
              Tag:{' '}
              <CloseBtn onClick={this.clearFilter}>
                {filterTitle}
                <i className="fa fa-times" aria-hidden="true"></i>
              </CloseBtn>
            </Title>
            <ArchiveList>
              {
                filterPost.map((o, i) => {
                  const color = newColors[i]
                  return (
                    <Archive key={o.id} color={color} archive={o} />
                  )
                })
              }
            </ArchiveList>
          </Wapper>
        </Transition>
        {!tags || (tags.length === 0 && <Loading />)}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(Tags)
