import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled, { keyframes } from 'styled-components'
import { Button, Icon, Transition, Popup } from 'semantic-ui-react'
import SmoothScroll from 'smooth-scroll'
import marked from 'marked'
import skPlayer from 'skplayer'

import config from '../config'
const { duration, playerBg, playerType, playListId, playList } = config

// 节流
function throttle (fn, wait) {
  let time = Date.now()
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn()
      time = Date.now()
    }
  }
}

// 一言
const hitokoto = require('../assets/hitokoto.json')
const hitokotos = JSON.parse(JSON.stringify(hitokoto, null, 2)).hitokotos

// waifu
const model = require('../assets/waifu.json')
const modelObj = JSON.parse(JSON.stringify(model, null, 2))

// 滚动
const scroll = new SmoothScroll()

const hoverTips = {
  backHome: '回首页看看吧 o(*￣▽￣*)ブ',
  dressup: "要看看我的新衣服嘛 (●'◡'●)",
  takePhoto: '要给我拍张照嘛（<ゝω・）☆',
  talk: '要听我讲故事么 ฅ●ω●ฅ',
  lightbulb: '深夜注意爱护眼睛哦 (✪ω✪)',
  info: '要了解更多关于我的故事么 (*´∀`)~♥',
  hidden: '到了说再见的时候了么 (｡ŏ_ŏ)',
  music: '来听听歌吧 ♪(^∇^*)',
  scroll: '唰地一下就跑上面去了哦 ( • ̀ω•́ )',
}

const clickTips = {
  dressup: "我的新衣服漂亮么 (●'◡'●)",
  takePhoto: '我的照片要好好收藏哦（<ゝω・）☆',
  lightbulb: '一起来做眼保健操吧 (ﾉ◕∀◕)ﾉ*:･ﾟ✧',
  hidden: '人生若只如初见，和你在一起的这段时间很开心 (▰˘◡˘▰)',
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%;
  &::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: all 1s ease;
    z-index: 1000;
    background: ${props => props.lightbulb ? 'rgba(0, 0, 0, .4)' : ''};
  }

  i.like {
    color: ${props => props.likeChanshiyu ? '#faf!important' : ''};
  }
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
  display: ${props => props.showWaifu ? 'block' : 'none'};
  position: fixed;
  bottom: 0;
  left: 10px;
  width: 280px;
  height: 250px;
  z-index: 1;
  font-size: 0;
  transition: all .3s ease-in-out;
  -webkit-transform: translateY(3px);
  transform: translateY(3px);
  #live2d {
    position: fixed;
    left: 10px;
    bottom: 0;
    z-index: 10;
  }
  .waifu-tips {
    opacity: ${props => props.showTips ? 1 : 0};
    width: 250px;
    height: 66px;
    margin: ${props => props.waifu === 'pio' ? 0 : '-30px'} 20px;
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
    display: block;
    position: absolute;
    top: 50px;
    right: -20px;
    width: 20px;
    z-index: 999;
    i {
      font-size: 16px;
    }
  }
  // &:hover {
  //   .waifu-tool {
  //     display: block;
  //   }
  // }
  @media (max-width: 900px) {
    display: none;
  }
`

const WaifuBtn = styled(Button)`
  padding: 0!important;
  margin: 2px 0!important;
  background: transparent!important;
`

const SkyPlayer = styled.div`
  position: fixed;
  right: 10px;
  bottom: 350px;
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
  i {
    font-size: 26px!important;
  }
  @media (max-width: 900px) {
    display: none!important;
  }
`

const ScrollToTop = FooterIcon.extend`
  bottom: 110px;
`

const PlayBtn = FooterIcon.extend`
  bottom: 52px;
  i.icon.loading {
    animation: icon-loading 4s linear infinite!important;
  }
`

const LikeBtn = FooterIcon.extend`
  bottom: -4px;
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
    // 加载 waifu!!!
    const initTips = '欢迎来到<font color=#f6f> 蝉時雨 </font>，今天也要元气满满哦！'
    this.dressup({ initLoad: true })
    this.showTips({ forced: true, initTips })

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
    }, 3000)

    // 滚动
    document.addEventListener('scroll', throttle(this.handleScroll, 160))
  }

  componentWillUnmount() {
    // 播放器
    this.skPlayer.destroy()
    this.audio.removeEventListener('play', this.handleListen)
    this.audio.removeEventListener('pause', this.handleListen)

    // 滚动
    document.removeEventListener('scroll', this.handleScroll)
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

  // 监听页面滚动
  handleScroll = (e) => {
    const osTop = document.documentElement.scrollTop || document.body.scrollTop
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        showTop: osTop >= 200,
      }
    })
  }

  // 换装
  dressup = ({ changeWaifu, initLoad }) => {
    const { waifu } = this.props
    const nextWaifu = changeWaifu ? (waifu === 'tia' ? 'pio' : 'tia') : waifu
    const textures = `https://song.acg.sx/textures/${nextWaifu}?${Date.now()}`
    modelObj.model = `moc/${nextWaifu}.moc`
    modelObj.textures = [textures]
    window.modelObj = modelObj
    window.loadlive2d('live2d', '/live2d/', '')
    // 切换老婆
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        waifu: nextWaifu
      }
    })

    if (!initLoad) {
      const tiaTips = '我是<font color=#f6f> 姐姐 Tia </font>，有什么需要帮助嘛 (*^_^*)'
      const pioTips = '我是<font color=#f6f> 妹妹 Pio </font>, 来接替姐姐大人的工作哦 (*^_^*)'
      const tips = changeWaifu ? (waifu === 'tia' ? pioTips : tiaTips ) : clickTips.dressup
      this.props.dispatch({
        type: 'appModel/showTips',
        payload: {
          tips,
        }
      })
    }
  }

  // 拍照
  takePhoto = () => {
    window.Live2D.captureName = 'waifu.png';
    window.Live2D.captureFrame = true;
    this.props.dispatch({
      type: 'appModel/showTips',
      payload: {
        tips: clickTips.takePhoto,
      }
    })
  }

  // 关灯
  lightbulb = () => {
    const { lightbulb } = this.props
    this.props.dispatch({
      type: 'appModel/showTips',
      payload: {
        tips: clickTips.lightbulb,
        lightbulb: !lightbulb,
      }
    })
  }

  // 隐藏
  hiddenWaifu = () => {
    this.props.dispatch({
      type: 'appModel/hiddenWaifu',
      payload: {
        tips: clickTips.hidden,
      }
    })
  }

  // 老婆有话要说
  showTips = ({ forced, initTips }) => {
    const { updatedAt } = this.props
    if (Date.now() - updatedAt > 16000 || initTips || forced) {
      const tips = hitokotos[Math.floor(Math.random() * hitokotos.length)].hitokoto
      this.props.dispatch({
        type: 'appModel/showTips',
        payload: {
          tips: initTips || tips,
        }
      })
    }
    setTimeout(() => this.showTips({}), 16000)
  }

  // hover 触发对话
  _handleMouseOver = (type) => {
    const { waifu, likeChanshiyu } = this.props
    let tips = ''
    if (type === 'changeWaifu') {
      tips = `要介绍<font color=#f6f>${waifu === 'pio' ? ' 姐姐 Tia ' : ' 妹妹 Pio ' } </font>给你认识么ヾ(●゜▽゜●)♡`
    } else if (type === 'like') {
      tips = likeChanshiyu ? '已经点赞过了哦 ε٩(๑> ₃ <)۶з ' : '喜欢就点个赞吧 ヾ(●゜▽゜●)♡'
    } else {
      tips = hoverTips[type]
    }
    this.props.dispatch({
      type: 'appModel/showTips',
      payload: {
        tips,
      }
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

  // 喜欢
  likeSite = () => {
    const { likeChanshiyu } = this.props
    if (!likeChanshiyu) {
      this.props.dispatch({
        type: 'appModel/likeSite',
      })
    }
  }

  // 滚动到顶部
  scrollToTop = () => {
    const header = document.getElementById('header')
    scroll.animateScroll( header )
  }

  render() {
    const { showTop, showPlayer, isPlaying, showWaifu, waifu, tips, lightbulb, likeTime, likeChanshiyu } = this.props
    return (
      <Container lightbulb={lightbulb} likeChanshiyu={likeChanshiyu}>
        <Transition visible={!!showPlayer} mountOnShow={false} animation='fly left' duration={duration}>
          <SkyPlayer className="myplayer">
            <div id="skPlayer"></div>
          </SkyPlayer>
        </Transition>
        <Waifu showWaifu={showWaifu} waifu={waifu} showTips={!!tips.length}>
          <canvas id="live2d" width="280" height="250" className="live2d"></canvas>
          <div className="waifu-tips" dangerouslySetInnerHTML={{ __html: marked(tips) }}></div>
          <div className="waifu-tool" id="waifu-tool">
            <Link to='/'>
              <WaifuBtn
                icon
                className="waifu-btn"
                onMouseOver={() => this._handleMouseOver('backHome')}>
                <Icon name='university'/>
              </WaifuBtn>
            </Link>
            <WaifuBtn
              icon
              className="waifu-btn"
              onClick={() => this.dressup({ changeWaifu: true })}
              onMouseOver={() => this._handleMouseOver('changeWaifu')}>
              <Icon name='lesbian'/>
            </WaifuBtn>
            <WaifuBtn
              icon
              className="waifu-btn"
              onClick={() => this.dressup({ changeWaifu: false })}
              onMouseOver={() => this._handleMouseOver('dressup')}>
              <Icon name='female'/>
            </WaifuBtn>
            <WaifuBtn
              icon
              className="waifu-btn"
              onClick={this.takePhoto}
              onMouseOver={() => this._handleMouseOver('takePhoto')}>
              <Icon name='camera retro'/>
            </WaifuBtn>
            <WaifuBtn
              icon
              className="waifu-btn"
              onClick={() => this.showTips({ forced: true })}
              onMouseOver={() => this._handleMouseOver('talk')}>
              <Icon name='talk'/>
            </WaifuBtn>
            <WaifuBtn
              icon
              className="waifu-btn"
              onClick={this.lightbulb}
              onMouseOver={() => this._handleMouseOver('lightbulb')}>
              <Icon name='lightbulb'/>
            </WaifuBtn>
            <Link to='/post/4'>
              <WaifuBtn
                icon
                className="waifu-btn"
                onMouseOver={() => this._handleMouseOver('info')}>
                <Icon name='info circle'/>
              </WaifuBtn>
            </Link>
            <WaifuBtn
              icon
              className="waifu-btn"
              onClick={this.hiddenWaifu}
              onMouseOver={() => this._handleMouseOver('hidden')}>
              <Icon name='delete'/>
            </WaifuBtn>
          </div>
        </Waifu>
        <Transition visible={!!showTop} mountOnShow={false} animation='fly left' duration={duration}>
          <ScrollToTop icon onClick={this.scrollToTop} onMouseOver={() => this._handleMouseOver('scroll')}>
            <Icon name='chevron up' bordered circular/>
          </ScrollToTop>
        </Transition>
        <Popup
          trigger={<LikeBtn icon onClick={this.likeSite} onMouseOver={() => this._handleMouseOver('like')}>
            <Icon className="like" name='heart' bordered circular/>
          </LikeBtn>}
          content={`已有 ${likeTime} 人点赞了哦`}
          position='left center'
          style={{
            borderRadius: '3px',
            padding: '12px 16px',
            backgroundColor: 'rgba(255, 255, 255, .6)',
          }}
        />
        <PlayBtn icon onClick={this.togglePlayer} onMouseOver={() => this._handleMouseOver('music')}>
          <Icon name='music' bordered circular loading={isPlaying}/>
        </PlayBtn>
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
