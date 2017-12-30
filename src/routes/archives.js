import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled from 'styled-components'
import { Transition, Card, Icon, Button } from 'semantic-ui-react'
import Quote from '../components/quote'
import Loading from '../components/loading'

const Container = styled.div`
  padding: 10px 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  background: rgba(255, 255, 255, .6);
`

const ArchiveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

const Archive = styled.div`
  display: inline-block;
  margin: 6px 0;
  width: 49%;
`

const StyledCard = styled(Card)`
  width: 100%;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)!important;
  background: rgba(255, 255, 255, .6)!important;
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s, opacity 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s!important;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23)!important;
    transform: translateY(-4px);
  }
`

const StyledDescription = styled(Card.Description)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

const StyledTag = styled.span`
  padding-right: 4px;
`

const Item = styled.span`
  margin-right: 10px;
  color: #999;
`

const LoadMore = styled.div`
  margin: 16px 0 6px;
  text-align: center;
`

const LoadText = styled.span`
  padding: 4px 8px;
`

const StyledButton = styled(Button)`
  background: transparent!important;
`

class Archives extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/queryTotal'
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'site/reset',
      payload: {
        loading: true,
        hasMore: true,
        total: 0,
        page: 0,
        pageSize: 4,
        archives: [],
      }
    })
  }

  // 加载更多
  queryMore = () => {
    this.props.dispatch({
      type: 'site/queryMore'
    })
  }

  renderArchives = (archives) => {
    if (archives && archives.length > 0) {
      const archiveList = archives.map((o) => {
        const { id, number, created_at, milestone, labels, title } = o
        const date = created_at.slice(0, 10)
        return (
          <Archive key={id}>
            <Link to={`/post/${number}`}>
              <StyledCard raised fluid >
                <Card.Content>
                  <StyledDescription>{title}</StyledDescription>
                </Card.Content>
                <Card.Content extra>
                  <Item>
                    <Icon name='time' />
                    {date}
                  </Item>
                  <Item>
                    <Icon name='bookmark' />
                    {milestone && milestone.title ? milestone.title : '未分类' }
                  </Item>
                  <Item>
                    <Icon name='tags' />
                    {
                      labels.map((o) => {
                        return (
                          <StyledTag key={o.id}>
                            {o.name}
                          </StyledTag>
                        )
                      })
                    }
                  </Item>
                </Card.Content>
              </StyledCard>
            </Link>
          </Archive>
        )
      })
      return archiveList
    }
  }

  render() {
    const { loading, hasMore, archives } = this.props
    const text = '文章千古事，得失寸心知'
    return (
      <Container>
        <Transition visible={!loading} animation='scale' duration={1000}>
          <div>
            <Quote text={text} />
            <ArchiveList>
              {this.renderArchives(archives)}
            </ArchiveList>
            <LoadMore>
              <StyledButton icon onClick={hasMore ? this.queryMore : null }>
                <Icon loading={loading} name='modx' />
                <LoadText>{ hasMore ? (loading ? '加载中~' : '加载更多') : '没有更多了哟'}</LoadText>
                <Icon loading={loading} name='modx' />
              </StyledButton>
            </LoadMore>
          </div>
        </Transition>
        {!archives || archives.length === 0 &&
          <Loading />
        }
      </Container>
    )
  }
}

export default connect(({ site }) => ({ ...site }))(Archives)
