import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import SmoothScroll from 'smooth-scroll'

import { PostBody, Preview, Loading } from '../components'
import config from '../config'
const { reward, duration, transitions } = config

// 滚动
const scroll = new SmoothScroll()

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
const Reward = styled.div`
  position: relative;
  text-align: center;
  margin: .12rem 0;
  & > div {
    display: inline-block;
  }
`

const RewardIcon = styled.span`
  display: inline-block;
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

const RewardMain = styled.div`
  position: absolute;
  top: .4rem;
  left: 50%;
  margin-left: -1.82rem;
  padding-top: .12rem;
  width: 3.64rem;
  z-index: 1;
  box-sizing: border-box;
  animation-duration: .6s;
  animation-fill-mode: forwards;
  ${props => props.init ? 'display: none;' : ''}
  ul {
    padding: .12rem .16rem;
    display: flex;
    justify-content: space-between;
    border-radius: .03rem;
    background: rgba(255, 255, 255, .88);
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
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 0;
      height: 0;
      border-left: .12rem solid transparent;
      border-right: .12rem solid transparent;
      border-bottom: .12rem solid rgba(255, 255, 255, .6);
    }
  }
`

const MorePost = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 0 0 .03rem .03rem;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

class Post extends PureComponent {
  componentDidMount() {
    // 避免多次加载，设计延时
    this.shouldQuery = true
    this.queryPost()

    // 滚动到顶部
    this.header = document.getElementById('header')
    this.header.scrollIntoView()
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
    if (this.header) scroll.animateScroll(this.header)
    this.props.dispatch({
      type: 'post/queryPost',
      payload: {
        number,
      },
    })
  } 

  // 打赏
  toggleReward = () => {
    const { rewardStatu } = this.props
    this.props.dispatch({
      type: 'post/update',
      payload: {
        rewardStatu: rewardStatu === 0 ? 1 : -rewardStatu
      }
    })
  }

  render() {
    const { loading, post, prevPost, nextPost, rewardStatu } = this.props
    const showPost = !loading && !!Object.keys(post).length
    return (
      <Container className="Post">
        {showPost
          ? <Wapper
              onShow={showPost}
              className={showPost ? transitions.post : ''}
            >
              <PostBody {...post} />
              <Reward>
                <div
                  onMouseEnter={this.toggleReward}
                  onMouseLeave={this.toggleReward}
                >
                  <RewardIcon>
                    赏
                  </RewardIcon>
                  <RewardMain
                    className={rewardStatu === 1 ? 'flip-in-y' : 'flip-out-y'}
                    init={rewardStatu === 0}
                  >
                    <ul> 
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
                    </ul>
                  </RewardMain>
                </div>
              </Reward>
              <MorePost>
                <Preview {...prevPost} /> 
                <Preview {...nextPost} />
              </MorePost>
            </Wapper>
          : <Loading />
        }

        {showPost && post.id && <div id={`gitalk-${post.id}`} /> }
      </Container>
    )
  }
}

export default connect(({ loading, post }) => ({
  loading: loading.models.post,
  ...post,
}))(Post)
