import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Segment, Label, Icon } from 'semantic-ui-react'
import marked from 'marked'
import Gitalk from 'gitalk'
import Quote from '../components/quote'
import Loading from '../components/loading'
import config from '../config'

const { gitalkOptions, duration, transitions, qoutes, aboutOptions } = config
const { avatar, info, enableGitalk, section } = aboutOptions

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  padding: 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.24);
  background: rgba(255, 255, 255, .6);
`

const Content = styled.div`
  p {
    margin: 10px 0;
    line-height: 1.6;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, .6);
  box-shadow: 0 0 10px 2px #999;
  transition: transform 1.0s ease-out;
  &:hover {
    animation-play-state:paused;
    transform: rotateZ(360deg);
  }
`

const Info = styled.div`
  margin-left: 16px;
`

const Item = styled.div`
  margin:4px 10px 4px 0;
`

const Section = styled(Segment)`
  background: rgba(255, 255, 255, .4)!important;
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s, opacity 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s!important;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23)!important;
    transform: translateY(-4px);
  }
  p:last-child {
    margin-bottom: 0;
  }
`

class About extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/showPage',
      payload: {
        showAbout: true,
      }
    })

    if (enableGitalk) {
      const gitalk = new Gitalk({
        ...gitalkOptions,
        title: '关于'
      })
      // 渲染评论
      gitalk.render('gitalk')
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'site/reset',
      payload: {
        showAbout: false,
      }
    })
  }

  render() {
    const { showAbout } = this.props
    return (
      <Container>
        <div>
          <Transition visible={showAbout} animation={transitions.page || 'drop'} duration={duration}>
            <Wapper>
              <Quote text={qoutes.about} />
              <Content>
                <Header>
                  <Avatar alt='' src={avatar}/>
                  <Info>
                    {
                      info.length > 0 && info.map((o, i) => {
                        return (
                          <Item key={i}>
                            <Icon name={o.icon} /> {o.text}
                          </Item>
                        )
                      })
                    }
                  </Info>
                </Header>
                {
                  section.length > 0 && section.map((o, i) => {
                    return (
                      <Section key={i} raised color={o.color}>
                        <Label as='a' color={o.color} ribbon>{o.title}</Label>
                        <div dangerouslySetInnerHTML={{ __html: marked(o.content) }}></div>
                      </Section>
                    )
                  })
                }

              </Content>
            </Wapper>
          </Transition>
          {!showAbout && <Loading />}
        </div>
        {enableGitalk && <div id='gitalk'></div>}
      </Container>
    )
  }

}

export default connect(({ site }) => ({ ...site }))(About)
