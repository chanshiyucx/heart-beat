import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Segment, Label, Icon } from 'semantic-ui-react'
import Gitalk from 'gitalk'
import Quote from '../components/quote'
import Loading from '../components/loading'
import config from '../config'

const { gitalkOptions, avatar, contact, duration } = config

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

const Contact = styled.div`
  margin-top: 10px;
`

const Desc = Section.extend`
  p {
    margin: 10px 0 16px;
  }
`

class About extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/showAbout',
    })
    const gitalk = new Gitalk({
      ...gitalkOptions,
      title: '关于'
    })
    // 渲染评论
    gitalk.render('gitalk')
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
    const text = '蝉鸣如雨，花宵道中'
    return (
      <Container>
        <div>
          <Transition visible={showAbout} animation='drop' duration={duration}>
            <Wapper>
              <Quote text={text} />
              <Content>
                <Header>
                  <Avatar alt='' src={avatar}/>
                  <Info>
                    <Item>
                      <Icon name='user' /> 蝉時雨
                    </Item>
                    <Item>
                      <Icon name='envira' /> 蝉鸣如雨，花宵道中
                    </Item>
                    <Item>
                      <Icon name='university' /> University of Electronic Science and Technology of China (UESTC)
                    </Item>
                    <Item>
                      <Icon name='graduation' /> Communication&Information Engineering
                    </Item>
                  </Info>
                </Header>
                <Desc raised color='pink'>
                  <Label as='a' color='pink' ribbon>Origin</Label>
                  <p>蝉時雨，源自日语 せみしぐれ。</p>
                  <p>夏日众蝉鸣叫此起彼伏好似落雨，蝉儿们似要将仅存的的生命燃烧奏出最后的音符，绚烂与壮美中氤氲着沉寂与无常，是日本夏天最具代表性的季节物语之一。</p>
                  <p>正如蝉儿一般，生命短暂即逝，却仍一无反顾奏出生命的最强音，而我的青春岁月又何尝不期望如此，在最美的年华绽放最璀璨的人间烟火。</p>
                  <p>蝉鸣如雨，花宵道中，一如少年。</p>
                </Desc>
                <Section raised color='orange'>
                  <Label as='a' color='orange' ribbon>Contact</Label>
                  <Contact>
                    {
                      contact.map((o, i) => {
                        return (
                          <a key={i} href={o.link} targe='_blank'>
                            <Item>
                              <Icon name={o.icon} /> {o.name}
                            </Item>
                          </a>
                        )
                      })
                    }
                  </Contact>
                </Section>
                <Section raised color='yellow'>
                  <Label as='a' color='yellow' ribbon>Timeline</Label>
                  <p>
                    2017-12-31: React 重写 SPA 博客，全站使用 Github Issues <br />
                    2017-07-??: 魔改 NexT，风格转变二次元 <br />
                    2017-04-??: 博客荒废中重生，迁入 Hexo，主题 NexT <br />
                    2016-03-17: 购入域名 chanshiyu.com，小站起步 <br />
                  </p>
                </Section>
                <Section raised color='purple'>
                  <Label as='a' color='purple' ribbon>Theme</Label>
                  <p>
                    如你所见，现在呈现在你眼前的是一个 React 开发的 SPA 单页面博客应用程序，后台数据源依托于 Github Issues，前端框架采用 React + Dva，组件库采用 Semantic-UI，样式方案采用 Styled Components。
                    此外，还使用开源项目 Gitalk 作为博客的评论系统，Gitter 扩展博客留言功能，基本上使用了 Github 全家桶套餐。
                  </p>
                  <p>技术栈：React + Dva + Semantic-UI + Styled Components + Github Issues。</p>
                  <p>
                    写这个主题的初衷是因为 Hexo 已经不能满足自己日益增长的功能定制需求，便逐渐萌生了自己写博客主题的想法，于是 HeartBeat 就此诞生，而这也是第一个自己从零开始独立完成的博客主题。
                  </p>
                  <p>
                    我将这个主题命名为 HeartBeat，纯粹只是因为喜欢 HeartBeat 这个字体图标而已，由于后台使用了 Github 全家桶，这个博客程序不需要额外的服务器，完全免费。
                  </p>
                  <p>
                    目前主题刚刚成型，需要完善地方还有很多，优化之路还很漫长，希望将来正如主题的名字一样，让人第一眼萌生 HeartBeat 的感觉~
                  </p>
                  <h3>版本更新：</h3>
                  <p>
                    2017-01-07: 移除 Gitter 留言功能, 添加音乐播放器 skPlayer 并魔改样式，添加书单页 <br />
                    2017-12-31: HeartBeat Version 1.0 问世 <br />
                  </p>
                </Section>
              </Content>
            </Wapper>
          </Transition>
          {!showAbout &&
            <Loading />
          }
        </div>
        <div id='gitalk'></div>
      </Container>
    )
  }

}

export default connect(({ site }) => ({ ...site }))(About)
