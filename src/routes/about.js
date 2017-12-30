import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition } from 'semantic-ui-react'
import Gitalk from 'gitalk'
import Quote from '../components/quote'
import Loading from '../components/loading'

const Container = styled.div`
`

const Wapper = styled.div`
  padding: 10px 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  background: rgba(255, 255, 255, .6);
`

const Content = styled.div`
  p {
    margin: 16px;
    line-height: 1.6;
  }
`

class About extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/showAbout',
    })
    const gitalk = new Gitalk({
      clientID: '655fdc97b211a9f4f4a9',
      clientSecret: '77867cd14723002397338fcb76d139b13bdec439',
      repo: 'BlogComments',
      owner: 'chanshiyucx',
      admin: ['chanshiyucx'],
      // facebook-like distraction free mode
      distractionFreeMode: false,
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
        <Wapper>
          <Transition visible={showAbout} animation='scale' duration={1000}>
            <div>
              <Quote text={text} />
              <Content>
                <p>蝉時雨，源自日语 せみしぐれ。</p>
                <p>夏日众蝉鸣叫此起彼伏好似落雨，蝉儿们似要将仅存的的生命燃烧奏出最后的音符，绚烂与壮美中氤氲着沉寂与无常，是日本夏天最具代表性的季节物语之一。</p>
                <p>此刻又值盛夏，窗外的蝉鸣总是勾起我的思绪，恍惚间又回到当初那副光景。</p>
                <p>一片郁郁葱葱的树林间，灼眼的阳光从树叶缝隙洒落，斑驳的光影交错，树上的蝉儿嘶鸣，音浪如落雨，在林间回荡，久久不息，懵懂年少的我伫立在树下聆听这生命的哀歌。</p>
                <p>云烟一瞬已过十载，岁月不留人，韶华不可负。</p>
                <p>正如蝉儿一般，生命短暂即逝，却仍一无反顾奏出生命的最强音，而我的青春岁月又何尝不期望如此，在最美的年华绽放最璀璨的人间烟火。</p>
                <p>蝉鸣如雨，花宵道中，一如少年。</p>
              </Content>
            </div>
          </Transition>
          {!showAbout &&
            <Loading />
          }
        </Wapper>
        <div id='gitalk'></div>
      </Container>
    )
  }

}

export default connect(({ site }) => ({ ...site }))(About)
