import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition } from 'semantic-ui-react'
import Zooming from 'zooming'

import Loading from '../components/loading'
import PostBody from '../components/postBody'

import config from '../config'
const { duration } = config

const zooming = new Zooming({
  scaleBase: .8
})

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
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
    const header = document.getElementById('header')
    header.scrollIntoView()

    // 延时给图片加预览
    setTimeout(() => {
      const imgs = document.getElementsByClassName('zoomable')
      for (const img of imgs) {
        zooming.listen(img)
      }
    }, 3000)
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'post/reset'
    })
  }

  render() {
    const { loading, post, time } = this.props
    return (
      <Container className="Post">
        <Wapper>
          <Transition visible={!loading && Object.keys(post).length !== 0} animation='slide down' duration={duration}>
            <div>
              <PostBody { ...post } time={time} />
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
