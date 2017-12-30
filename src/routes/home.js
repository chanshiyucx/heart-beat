import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Button, Icon, Transition } from 'semantic-ui-react'
import PostCard from '../components/postCard'
import Loading from '../components/loading'

const Container = styled.div`
  position: relative;
  min-height: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PostList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`

const StyledButton = styled(Button)`
  position: absolute;
  top: 50%;
  margin: 0!important;
  width: 150px;
  background: transparent!important;
`

const StyledLeftButton = StyledButton.extend`
  left: 0;
  transform: translate(-100%, -50%);
`

const StyledRightButton = StyledButton.extend`
  right: 0;
  transform: translate(100%, -50%);
`

const StyledIcon = styled(Icon)`
  height: 100%!important;
  color: rgba(255, 255, 255, .8);
`

class Home extends PureComponent {
  componentDidMount() {
    // 获取文章总数
    this.props.dispatch({
      type: 'postList/queryTotal',
    })
  }

  componentWillUnmount() {
    // 重置
    this.props.dispatch({
      type: 'postList/reset',
    })
  }

  // 前一页
  prev = () => {
    this.props.dispatch({
      type: 'postList/queryList',
      payload: {
        queryType: 'prev',
      }
    })
  }

  // 后一页
  next = () => {
    this.props.dispatch({
      type: 'postList/queryList',
      payload: {
        queryType: 'next',
      }
    })
  }

  renderCard = (postList) => {
    if (postList && postList.length > 0) {
      const cardList = postList.map((o) => {
        return (
          <PostCard key={o.id} { ...o } />
        )
      })
      return cardList
    }
  }

  onHide = () => {
    this.props.dispatch({
      type: 'postList/update',
      payload: {
        onHide: true,
      }
    })
  }

  render() {
    const { loading, postList, onHide } = this.props
    return (
      <Container>
        <StyledLeftButton icon onClick={this.prev}>
          <StyledIcon name='angle double left' size='massive' />
        </StyledLeftButton>
        <StyledRightButton icon onClick={this.next}>
          <StyledIcon name='angle double right' size='massive'/>
        </StyledRightButton>
        <Transition visible={!loading} animation='scale' duration={500} onHide={this.onHide}>
          <div>
            <PostList>
              {this.renderCard(postList)}
            </PostList>
          </div>
        </Transition>
        {loading && onHide &&
          <Loading />
        }
      </Container>
    )
  }
}

export default connect(({ postList }) => ({ ...postList }))(Home)
