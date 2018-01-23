import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import Gitalk from 'gitalk'

import { Segment, Quote, Loading } from '../components'
import { shuffle } from '../utils'
import config from '../config'

const { gitalkOptions, duration, transitions, qoutes, aboutOptions, themeColors } = config
const { avatar, info, enableGitalk } = aboutOptions
const newColors = shuffle(themeColors)

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
  animation-fill-mode: forwards;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: .16rem;
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: .04rem solid rgba(255, 255, 255, .6);
  box-shadow: 0 0 10px 2px #999;
  transition: transform 1s ease-out;
  &:hover {
    animation-play-state: paused;
    transform: rotateZ(360deg);
  }
`

const Info = styled.div`
  margin-left: .16rem;
`

const Item = styled.div`
  margin: .03rem;
  i {
    margin-right: .03rem;
    width: .16rem;
  }
`

class About extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'page/queryPage',
      payload: {
        type: 'about',
      }
    })

    if (enableGitalk) {
      const gitalk = new Gitalk({
        ...gitalkOptions,
        title: '关于',
      })
      // 渲染评论
      gitalk.render('gitalk')
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        about: {},
      },
    })
  }

  render() {
    const { about } = this.props
    const showAbout = !!Object.keys(about).length
    const section = showAbout && about.body &&
                    about.body.split('## ').filter((o) => o.length > 0).map((o) => {
                      const title = o.match(/.+?\r\n/)[0]
                      return {
                        title,
                        content: o.slice(title.length)
                      }
                    })
    return (
      <Container>
        <Wapper
          onShow={showAbout}
          className={showAbout ? transitions.page.show : ''}
        >
          <Quote text={qoutes.about} />
          <div>
            <Header>
              <Avatar alt="" src={avatar} />
              <Info>
                {info.length > 0 &&
                  info.map((o, i) => {
                    return (
                      <Item key={i}>
                        <i className={`fa fa-${o.icon}`} aria-hidden="true"></i> {o.text}
                      </Item>
                    )
                  })}
              </Info>
            </Header>
            {!!section.length &&
              section.map((o, i) => {
                const color = newColors[i]
                return (
                  <Segment key={i} color={color} title={o.title} content={o.content} />
                )
              })}
          </div>
        </Wapper>
        {!showAbout && <Loading />}

        {enableGitalk && <div id="gitalk" />}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(About)
