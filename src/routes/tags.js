import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition } from 'semantic-ui-react'
import Quote from '../components/quote'
import Loading from '../components/loading'

const Container = styled.div`
  padding: 10px 16px;
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

const Tag = styled.span`
  margin: 10px;
  padding: 8px 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, .1);
  color: ${props => '#' + props.color || '#666' }
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
      }
    })
  }

  renderTags = (tags) => {
    if (tags && tags.length > 0) {
      const tagList = tags.map((o) => {
        return (
          <Tag key={o.id} color={o.color}>{o.name}</Tag>
        )
      })
      return tagList
    }
  }

  render() {
    const { tags } = this.props
    const text = '列卒周匝，星罗云布'
    return (
      <Container>
        <Transition visible={tags.length > 0} animation='scale' duration={1000}>
          <div>
            <Quote text={text} />
            <TagList>
              {this.renderTags(tags)}
            </TagList>
          </div>
        </Transition>
        {!tags || tags.length === 0 &&
          <Loading />
        }
      </Container>
    )
  }
}

export default connect(({ site }) => ({ ...site }))(Tags)
