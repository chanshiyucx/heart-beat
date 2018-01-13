import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled, { keyframes } from 'styled-components'
import { Button, Icon, Transition } from 'semantic-ui-react'
import SmoothScroll from 'smooth-scroll'
import marked from 'marked'
import skPlayer from 'skplayer'

import config from '../config'

const model = require('../assets/pio.json')
// const hitokoto = require('../assets/hitokoto.json')

const { duration, playerBg, playerType, playListId, playList } = config
const scroll = new SmoothScroll()

const Container = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%;
`

const shake = keyframes`
  2% {transform: translate(0.5px, -1.5px) rotate(-0.5deg);}
  4% {transform: translate(0.5px, 1.5px) rotate(1.5deg);}
  6% {transform: translate(1.5px, 1.5px) rotate(1.5deg);}
  8% {transform: translate(2.5px, 1.5px) rotate(0.5deg);}
  10% {transform: translate(0.5px, 2.5px) rotate(0.5deg);}
  12% {transform: translate(1.5px, 1.5px) rotate(0.5deg);}
  14% {transform: translate(0.5px, 0.5px) rotate(0.5deg);}
  16% {transform: translate(-1.5px, -0.5px) rotate(1.5deg);}
  18% {transform: translate(0.5px, 0.5px) rotate(1.5deg);}
  20% {transform: translate(2.5px, 2.5px) rotate(1.5deg);}
  22% {transform: translate(0.5px, -1.5px) rotate(1.5deg);}
  24% {transform: translate(-1.5px, 1.5px) rotate(-0.5deg);}
  26% {transform: translate(1.5px, 0.5px) rotate(1.5deg);}
  28% {transform: translate(-0.5px, -0.5px) rotate(-0.5deg);}
  30% {transform: translate(1.5px, -0.5px) rotate(-0.5deg);}
  32% {transform: translate(2.5px, -1.5px) rotate(1.5deg);}
  34% {transform: translate(2.5px, 2.5px) rotate(-0.5deg);}
  36% {transform: translate(0.5px, -1.5px) rotate(0.5deg);}
  38% {transform: translate(2.5px, -0.5px) rotate(-0.5deg);}
  40% {transform: translate(-0.5px, 2.5px) rotate(0.5deg);}
  42% {transform: translate(-1.5px, 2.5px) rotate(0.5deg);}
  44% {transform: translate(-1.5px, 1.5px) rotate(0.5deg);}
  46% {transform: translate(1.5px, -0.5px) rotate(-0.5deg);}
  48% {transform: translate(2.5px, -0.5px) rotate(0.5deg);}
  50% {transform: translate(-1.5px, 1.5px) rotate(0.5deg);}
  52% {transform: translate(-0.5px, 1.5px) rotate(0.5deg);}
  54% {transform: translate(-1.5px, 1.5px) rotate(0.5deg);}
  56% {transform: translate(0.5px, 2.5px) rotate(1.5deg);}
  58% {transform: translate(2.5px, 2.5px) rotate(0.5deg);}
  60% {transform: translate(2.5px, -1.5px) rotate(1.5deg);}
  62% {transform: translate(-1.5px, 0.5px) rotate(1.5deg);}
  64% {transform: translate(-1.5px, 1.5px) rotate(1.5deg);}
  66% {transform: translate(0.5px, 2.5px) rotate(1.5deg);}
  68% {transform: translate(2.5px, -1.5px) rotate(1.5deg);}
  70% {transform: translate(2.5px, 2.5px) rotate(0.5deg);}
  72% {transform: translate(-0.5px, -1.5px) rotate(1.5deg);}
  74% {transform: translate(-1.5px, 2.5px) rotate(1.5deg);}
  76% {transform: translate(-1.5px, 2.5px) rotate(1.5deg);}
  78% {transform: translate(-1.5px, 2.5px) rotate(0.5deg);}
  80% {transform: translate(-1.5px, 0.5px) rotate(-0.5deg);}
  82% {transform: translate(-1.5px, 0.5px) rotate(-0.5deg);}
  84% {transform: translate(-0.5px, 0.5px) rotate(1.5deg);}
  86% {transform: translate(2.5px, 1.5px) rotate(0.5deg);}
  88% {transform: translate(-1.5px, 0.5px) rotate(1.5deg);}
  90% {transform: translate(-1.5px, -0.5px) rotate(-0.5deg);}
  92% {transform: translate(-1.5px, -1.5px) rotate(1.5deg);}
  94% {transform: translate(0.5px, 0.5px) rotate(-0.5deg);}
  96% {transform: translate(2.5px, -0.5px) rotate(-0.5deg);}
  98% {transform: translate(-1.5px, -1.5px) rotate(-0.5deg);}
  0%, 100% { transform: translate(0, 0) rotate(0);}
`

const Waifu = styled.div`
  display: ${props => props.showPio ? 'block' : 'none'};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 280px;
  height: 250px;
  z-index: 1;
  font-size: 0;
  transition: all .3s ease-in-out;
  -webkit-transform: translateY(3px);
  transform: translateY(3px);
  #live2d {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
  .waifu-tips {
    // opacity: 0;
    width: 250px;
    height: 60px;
    margin: 0 20px;
    padding: 5px 10px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, .6);
    box-shadow: 0 3px 15px 2px rgba(0, 0, 0, .2);
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    animation-delay: 5s;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-name: ${shake};
    animation-timing-function: ease-in-out;
  }
  .waifu-tool {
    display: none;
    position: absolute;
    top: 70px;
    right: 10px;
    width: 20px;
    z-index: 999;
    i {
      font-size: 18px;
    }
  }
  &:hover {
    .waifu-tool {
      display: block;
    }
  }
`

const WaifuBtn = styled(Button)`
  padding: 0!important;
  margin: 6px 0!important;
  background: transparent!important;
`

const SkyPlayer = styled.div`
  position: fixed;
  right: 10px;
  bottom: 312px;
  #skPlayer, .skPlayer-list {
    background-color: rgba(255, 255, 255, .6)!important;
  }

  #skPlayer {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    .skPlayer-cover {
      border-radius: 3px;
    }
    .skPlayer-play-btn, .skPlayer-line {
      background-color: rgba(255, 170, 255, .8)!important;
    }
    .skPlayer-line-loading {
      background-color: rgba(0, 0, 0, .2)!important;
    }
  }

  .skPlayer-list {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background-image: url('${playerBg}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    li {
      border-top: none!important;
    }
    li.skPlayer-curMusic, li:hover {
      background-color: rgba(255, 170, 255, .6)!important;
    }
    .skPlayer-list-sign {
      background-color: #f6f!important;
    }
  }
`

const FooterIcon = styled(Button)`
  position: fixed;
  right: 10px;
  color: rgba(255, 255, 255, .8)!important;
  background: transparent!important;
  &:hover {
    color: rgba(0, 0, 0, .2)!important;
  }
  @media (max-width: 900px) {
    display: none!important;
  }
`

const PlayBtn = FooterIcon.extend`
  bottom: 66px;
  i.icon.loading {
    animation: icon-loading 4s linear infinite!important;
  }
`

const ScrollToTop = FooterIcon.extend`
  bottom: 0;
`

const InnerWrap = styled.div`
  text-align: center;
  line-height: 1.8;
`

const ItemList = styled.div`
  display: flex;
  justify-content: center;
`

const Item = styled.div`
  margin: 0 6px;
  display: flex;
  align-items: center;
`

class Footer extends PureComponent {
  componentDidMount() {
    // 播放器
    this.skPlayer = new skPlayer({
      autoplay: false,
      listshow: true,
      music: {
        type: playerType,
        source: playerType === 'cloud' ? playListId : playList,
      }
    })

    setTimeout(() => {
      this.audio = document.querySelector('audio')
      this.audio.addEventListener('play', this.handleListen)
      this.audio.addEventListener('pause', this.handleListen)
    }, 2000)

    // 加载 pio!!!
    this.dressup()
  }

  componentWillUnmount() {
    this.skPlayer.destroy()
    this.audio.removeEventListener('play', this.handleListen)
    this.audio.removeEventListener('pause', this.handleListen)
  }

  // 监听播放器状态
  handleListen = (e) => {
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        isPlaying: e.type === 'play',
      }
    })
  }

  // 换装
  dressup = () => {
    // const textures = 'https://song.acg.sx/images/textures/pio?' + Date.now()
    const textures = 'https://dn-coding-net-production-pp.qbox.me/ee52b52d-3fc4-42d1-9477-6692273e965d.png'
    const modelObj = JSON.parse(JSON.stringify(model, null, 2))
    modelObj.textures = [textures]
    window.modelObj = modelObj
    window.loadlive2d('live2d', '/live2d/pio', '')
  }

  // 拍照
  takePhoto = () => {
    window.Live2D.captureName = 'Pio.png';
    window.Live2D.captureFrame = true;
  }

  // 隐藏
  hiddenPio = () => {
    this.props.dispatch({
      type: 'appModel/hiddenPio',
    })
  }

  // 显示隐藏播放器
  togglePlayer = () => {
    const { showPlayer } = this.props
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        showPlayer: !showPlayer,
      }
    })
  }

  // 滚动到顶部
  scrollToTop = () => {
    const header = document.getElementById('header')
    scroll.animateScroll( header )
  }

  render() {
    const { showPlayer, isPlaying, showPio, tips } = this.props
    return (
      <Container>
        <Transition visible={!!showPlayer} mountOnShow={false} animation='fly left' duration={duration}>
          <SkyPlayer className="myplayer">
            <div id="skPlayer"></div>
          </SkyPlayer>
        </Transition>
        <Waifu showPio={showPio}>
          <canvas id="live2d" width="280" height="250" className="live2d"></canvas>
          <div className="waifu-tips" dangerouslySetInnerHTML={{ __html: marked(tips) }}></div>
          <div className="waifu-tool">
            <Link to='/'>
              <WaifuBtn icon>
                <Icon name='university'/>
              </WaifuBtn>
            </Link>
            <WaifuBtn icon onClick={this.dressup}>
              <Icon name='female'/>
            </WaifuBtn>
            <WaifuBtn icon onClick={this.takePhoto}>
              <Icon name='camera retro'/>
            </WaifuBtn>
            <WaifuBtn icon onClick={this.hiddenPio}>
              <Icon name='delete'/>
            </WaifuBtn>
          </div>
        </Waifu>
        <PlayBtn icon onClick={this.togglePlayer}>
          <Icon name='music' size='big' bordered circular loading={isPlaying}/>
        </PlayBtn>
        <ScrollToTop icon onClick={this.scrollToTop}>
          <Icon name='chevron up' size='big' bordered circular/>
        </ScrollToTop>
        <InnerWrap>
          <ItemList>
            <Item>
              <span><Icon name='copyright' /> </span>
              <span>2017 - 2018</span>
            </Item>
            <Item>
              <span><Icon name='heartbeat' /> </span>
              <span>蝉時雨</span>
            </Item>
          </ItemList>
          <ItemList>
            <Item>
              <p>Theme - <a href='https://github.com/chanshiyucx/SPA-Blog'>HeartBeat</a></p>
            </Item>|
            <Item>
               <p> Hosted by <a href='https://pages.coding.me'>Coding Pages</a></p>
            </Item>
          </ItemList>
        </InnerWrap>
      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Footer)
