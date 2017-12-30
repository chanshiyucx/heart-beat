import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition } from 'semantic-ui-react'
import Loading from '../components/loading'
import PostBody from '../components/postBody'

const Container = styled.div`
`

const Wapper = styled.div`
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  background: rgba(255, 255, 255, .6);
`

class Post extends PureComponent {
  componentDidMount() {
    const number = this.props.match.params.number
    this.props.dispatch({
      type: 'post/queryPost',
      payload: {
        number,
      }
    })

    // 滚动到顶部
    const body = document.querySelector('body')
    body.scrollIntoView()
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'post/reset'
    })
  }

  render() {
    const { post, loading } = this.props
    return (
      <Container className="Post">
        <Wapper>
          <Transition visible={!loading && Object.keys(post).length !== 0} animation='drop' duration={1000}>
            <div>
              <PostBody { ...post } />
            </div>
          </Transition>
          {loading &&
            <Loading />
          }
        </Wapper>
        <div id='gitalk'></div>
      </Container>
    )
  }
}

export default connect(({ post }) => ({ ...post }))(Post)
