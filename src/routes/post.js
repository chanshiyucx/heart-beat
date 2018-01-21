import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

import { PostBody, Loading } from '../components'
import config from '../config'
const { duration, transitions } = config

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  display: ${props => props.onShow ? 'block' : 'none'};
  width: 100%;
  border-radius: .03rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  background: rgba(255, 255, 255, .6);
  animation-duration: ${duration / 1000}s;
`

class Post extends PureComponent {
  componentDidMount() {
    const number = this.props.match.params.number
    this.props.dispatch({
      type: 'post/queryPost',
      payload: {
        number,
      },
    })

    // 滚动到顶部
    const header = document.getElementById('header')
    header.scrollIntoView()
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'post/reset',
    })
  }

  render() {
    const { loading, post, time } = this.props
    const showPost = !loading && !!Object.keys(post).length
    return (
      <Container className="Post">
        {showPost
          ? <Wapper
              onShow={showPost}
              className={showPost ? transitions.post : ''}
            >
              <PostBody {...post} time={time} />
            </Wapper>
          : <Loading />
        }

        <div id="gitalk" />
      </Container>
    )
  }
}

export default connect(({ post }) => ({ ...post }))(Post)
