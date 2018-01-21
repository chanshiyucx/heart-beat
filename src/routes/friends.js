import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import Gitalk from 'gitalk'

import { Quote, Loading } from '../components'
import config from '../config'

const { gitalkOptions, duration, transitions, qoutes, friendsOptions } = config
const { enableGitalk } = friendsOptions

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  display: ${props => props.onShow ? 'block' : 'none'};
  padding: .16rem;
  border-radius: .03rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  background: rgba(255, 255, 255, .6);
  animation-duration: ${duration / 1000}s;
`

const FriendList = styled.div`
  padding: 16px 1%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const Friend = styled.a`
  position: relative;
  margin-bottom: 16px;
  width: 200px;
  height: 112px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16);
  &:hover {
    .cover {
      transform: scale(1.1);
    }
    .content {
      transform: translateY(-120px);
    }
  }
`

const Cover = styled.img`
  width: 200px;
  height: 112px;
  transition: transform 0.6s ease-out;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 112px;
  background: rgba(255, 255, 255, .4);
  transition: transform .4s ease-out;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: -16px;
  border-radius: 50%;
  box-shadow: 0 0 9px #666;
  z-index: 1;
`

const Site = styled.span`
  padding: 20px 0 8px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  letter-spacing: 1px;
  box-shadow: 0 0 6px #999;
  background: rgba(255, 255, 255, 0.6);
`

class Friends extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'page/queryPage',
      payload: {
        type: 'friends',
      },
    })

    if (enableGitalk) {
      const gitalk = new Gitalk({
        ...gitalkOptions,
        title: '友链',
      })
      // 渲染评论
      gitalk.render('gitalk')
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        friends: {},
      },
    })
  }

  render() {
    const { friends } = this.props
    const showFriends = !!Object.keys(friends).length
    const section = showFriends && friends.body &&
                    friends.body.split('## ').filter((o) => o.length > 0).map((o) => {
                      const content = o.split('\r\n').filter((o) => o.length > 0)
                      return {
                        name: content[0],
                        link: content[1].split('link:')[1],
                        cover: content[2].split('cover:')[1],
                        avatar: content[3].split('avatar:')[1],
                      }
                    })
    return (
      <Container>
        <Wapper
          onShow={showFriends}
          className={showFriends ? transitions.page.show : ''}
        >
          <Quote text={qoutes.friends} />
          <FriendList>
            {!!section.length &&
              section.map((o, i) => {
                return (
                  <Friend key={i} href={o.link} target="_blank">
                    <Cover className="cover" alt="" src={o.cover} />
                    <Content className="content">
                      <Avatar alt="" src={o.avatar} />
                      <Site>{o.name}</Site>
                    </Content>
                  </Friend>
                )
              })
            }
          </FriendList>
        </Wapper>
        {!showFriends && <Loading />}

        {enableGitalk && <div id="gitalk" />}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(Friends)
