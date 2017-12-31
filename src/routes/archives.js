import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Icon, Button } from 'semantic-ui-react'
import ArchiveList from '../components/archiveList'
import Quote from '../components/quote'
import Loading from '../components/loading'

const Container = styled.div`
  margin: 0 auto;
  padding: 10px 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  background: rgba(255, 255, 255, .6);
  @media (max-width: 900px) {
    width: 96%;
  }
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

  render() {
    const { loading, hasMore, archives } = this.props
    const text = '文章千古事，得失寸心知'
    return (
      <Container>
        <Transition visible={!loading} animation='scale' duration={800}>
          <div>
            <Quote text={text} />
            <ArchiveList archives={archives} />
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
