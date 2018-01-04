import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Button, Icon } from 'semantic-ui-react'

import ArchiveList from '../components/archiveList'
import Quote from '../components/quote'
import Loading from '../components/loading'

import config from '../config'
const { duration } = config

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  padding: 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  background: rgba(255, 255, 255, .6);
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const Tag = styled(Button)`
  margin: 0 4px 10px!important;
  padding: 8px 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, .1)!important;
  color: ${props => '#' + props.bg + '!important' || '#666' };
  &:hover {
    background: rgba(0, 0, 0, .2)!important;
  }
`

const FilterHeader = styled.h2`
`

class Tags extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/queryTags',
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'site/reset',
      payload: {
        tags: [],
        tagsOnHide: false,
        filterTitle: '',
        filterPost: [],
      }
    })
  }

  filterPost = (tag) => {
    this.props.dispatch({
      type: 'site/filterPost',
      payload: {
        type: 'labels',
        filter: tag,
        filterTitle: tag,
      }
    })
  }

  clearFilter = () => {
    this.props.dispatch({
      type: 'site/update',
      payload: {
        tagsOnHide: false,
        filterTitle: '',
        filterPost: [],
      }
    })
  }

  onHide = () => {
    this.props.dispatch({
      type: 'site/update',
      payload: {
        tagsOnHide: true,
      }
    })
  }

  renderTags = (tags) => {
    if (tags && tags.length > 0) {
      const tagList = tags.map((o) => {
        return (
          <Tag key={o.id} bg={o.color} onClick={() => this.filterPost(o.name)}>{o.name}</Tag>
        )
      })
      return tagList
    }
  }

  render() {
    const { tags, tagsOnHide, filterTitle, filterPost } = this.props
    const text = '列卒周匝，星罗云布'
    return (
      <Container>
        <Transition visible={tags.length > 0 && !filterTitle} animation='drop' duration={duration} onHide={this.onHide}>
          <Wapper>
            <Quote text={text} />
            <TagList>
              {this.renderTags(tags)}
            </TagList>
          </Wapper>
        </Transition>
        <Transition visible={tagsOnHide && !!filterTitle} animation='drop' duration={duration}>
          <Wapper>
            <FilterHeader>
              Tag: <Tag icon labelPosition='right' onClick={this.clearFilter}>
                     {filterTitle}
                     <Icon name='delete' color='red' />
                   </Tag>
            </FilterHeader>
            <ArchiveList archives={filterPost} />
          </Wapper>
        </Transition>
        {!tags || tags.length === 0 &&
          <Loading />
        }
      </Container>
    )
  }
}

export default connect(({ site }) => ({ ...site }))(Tags)
