import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Button } from 'semantic-ui-react'

import Loading from '../components/loading'
import PostBody from '../components/postBody'

import config from '../config'
const { reward, duration, transitions } = config

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

const Footer = styled.div`
  position: relative;
  padding: 12px 0;
  text-align: center;
`

const RewardBtn = styled(Button)`
  color: rgba(255, 255, 255, 0.8) !important;
  background: transparent !important;
`

const QRWapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const QRInner = styled.div`
  display: flex;
  justify-content: center;
`

const QRItem = styled.div`
  margin: 0 16px;
  h2 {
    font-size: 22px;
    font-weight: 500;
  }
  img {
    width: 200px;
    height: 200px;
  }
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

  toggleReward = () => {
    const { showReward } = this.props
    this.props.dispatch({
      type: 'post/update',
      payload: {
        showReward: !showReward
      }
    })
  }

  render() {
    const { loading, post, time, showReward } = this.props
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
          {/*    <Footer>
                <RewardBtn onClick={this.toggleReward}>Click Here</RewardBtn>
                <Transition
                  visible={showReward}
                  mountOnShow={false}
                  animation="drop"
                  duration={600}
                >
                  <QRWapper>
                    <QRInner>
                      {reward.map((o, i) => {
                        return (
                          <QRItem key={i}>
                            <h2>{o.title}</h2>
                            <img src={o.qrImg} alt="" />
                          </QRItem>
                        )
                      })
                      }
                    </QRInner>
                  </QRWapper>
              </Transition>
              </Footer> */}
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
