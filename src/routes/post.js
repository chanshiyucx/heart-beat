import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition } from 'semantic-ui-react'

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
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.24);
  background: rgba(255, 255, 255, 0.6);
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
    return (
      <Container className="Post">
        <div>
          <Transition
            visible={!loading && Object.keys(post).length !== 0}
            animation={transitions.post || 'drop'}
            duration={duration}
          >
            <Wapper>
              <PostBody {...post} time={time} />
            </Wapper>
          </Transition>
          {loading && <Loading />}
        </div>
        <div id="gitalk" />
      </Container>
    )
  }
}

export default connect(({ post }) => ({ ...post }))(Post)
