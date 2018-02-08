import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

import { PostBody, Preview, Loading } from '../components'
import config from '../config'
import { setTimeout } from 'timers';
const { reward, duration, transitions } = config

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
const Footer = styled.div`
  position: relative;
  text-align: center;
`

const RewardIcon = styled.span`
  display: inline-block;
  margin-bottom: .12rem;
  width: .4rem;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  font-size: .2rem;
  border-radius: 50%;
  color: #888;
  background: rgba(255, 255, 255, .6);
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  &:hover {
    color: #faf;
  }
`

const Reward = styled.ul`
  position: absolute;
  padding: .12rem .16rem;
  display: flex;
  justify-content: space-between;
  top: .56rem;
  left: 50%;
  width: 3.64rem;
  margin-left: -1.82rem;
  box-sizing: border-box;
  border-radius: .03rem;
  z-index: 1;
  background: rgba(255, 255, 255, .88);
  animation-duration: .6s;
  animation-fill-mode: forwards;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: .03rem;
    }
    span {
      margin-top: .1rem;
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: -.13rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: .13rem solid transparent;
    border-right: .13rem solid transparent;
    border-bottom: .13rem solid rgba(255, 255, 255, .88);
  }
`

const MorePost = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 0 0 .03rem .03rem;
`

class Post extends PureComponent {
  componentDidMount() {
    // 避免多次加载，设计延时
    this.shouldQuery = true
    this.queryPost()

    // 滚动到顶部
    const header = document.getElementById('header')
    header.scrollIntoView()
  }

  componentWillReceiveProps(nextProps) {
    const { post } = this.props
    if (this.shouldQuery && post.number && +post.number !== +nextProps.match.params.number) {
      this.shouldQuery = false
      setTimeout(() => this.shouldQuery = true, 2000)
      this.queryPost(nextProps.match.params.number)
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'post/reset',
    })
  }

  // 获取文章
  queryPost = (num) => {
    const number = num || this.props.match.params.number
    this.props.dispatch({
      type: 'post/queryPost',
      payload: {
        number,
      },
    })
  } 

  // 打赏
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
    const { loading, post, prevPost, nextPost, showReward } = this.props
    const showPost = !loading && !!Object.keys(post).length
    return (
      <Container className="Post">
        {showPost
          ? <Wapper
              onShow={showPost}
              className={showPost ? transitions.post : ''}
            >
              <PostBody {...post} />
              <Footer>
                <RewardIcon 
                  onMouseOver={this.toggleReward}
                  onMouseOut={this.toggleReward}
                >
                  赏
                </RewardIcon>
                <Reward className={showReward ? 'flip-in-y' : 'flip-out-y'}>
                  {
                    reward.map((o, i) => {
                      return (
                        <li key={i}>
                          <img alt="" src={o.qr} />
                          <span>{o.type}</span>
                        </li>
                      )
                    })
                  }
                </Reward>
              </Footer>
              <MorePost>
                <Preview {...prevPost} /> 
                <Preview {...nextPost} />
              </MorePost>
            </Wapper>
          : <Loading />
        }

        <div id="gitalk" />
      </Container>
    )
  }
}

export default connect(({ loading, post }) => ({
  loading: loading.models.post,
  ...post,
}))(Post)
