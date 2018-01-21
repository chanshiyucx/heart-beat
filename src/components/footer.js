import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled, { keyframes } from 'styled-components'
import SmoothScroll from 'smooth-scroll'
import marked from 'marked'
import skPlayer from 'skplayer'

import config from '../config'
const { playerBg, playerType, playListId, playList, backstretch } = config

// 节流
function throttle(fn, wait) {
  let time = Date.now()
  return function() {
    if (time + wait - Date.now() < 0) {
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
  padding-bottom: .1rem;
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
    background: ${props => (props.lightbulb ? 'rgba(0, 0, 0, .4)' : '')};
  }

  i.like {
    color: ${props => (props.likeChanshiyu ? '#faf!important' : '')};
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
  display: ${props => (props.showWaifu ? 'block' : 'none')};
  position: fixed;
  bottom: 0;
  left: 10px;
  width: 280px;
  height: 250px;
  z-index: 1;
  font-size: 0;
  transition: all 0.3s ease-in-out;
  -webkit-transform: translateY(3px);
  transform: translateY(3px);
  #live2d {
    position: fixed;
    left: 10px;
    bottom: 0;
    z-index: 10;
  }
  .waifu-tips {
    opacity: ${props => (props.showTips ? 1 : 0)};
    width: 250px;
    height: 66px;
    margin: ${props => (props.waifu === 'pio' ? 0 : '-30px')} 20px;
    padding: 5px 10px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
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
    bottom: 2px;
    left: 0;
    width: 20px;
    z-index: 999;
    i {
      font-size: 16px;
    }
  }
  @media (max-width: 900px) {
    display: none;
  }
`

const WaifuBtn = styled.button`
  width: .16rem;
  height: .16rem;
  margin: .04rem 0;
  color: #444;
  border: none;
  outline: 0;
  background: transparent;
`

const SkyPlayer = styled.div`
  position: fixed;
  right: ${props => props.onShow ? '10px' : '-600px'};
  bottom: 334px;
  transition: all 0.6s cubic-bezier(.6, .2, .1, 1) 0s;
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

const FooterIcon = styled.button`
  padding: .1rem;
  width: .22rem;
  height: .22rem;
  outline: 0;
  box-sizing: content-box;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, .2);
  background: transparent;
  i {
    font-size: .22rem;
  }
  &:hover {
    color: rgba(0, 0, 0, .2);
  }
  @media (max-width: 900px) {
    display: none;
  }
`

const ScrollToTop = FooterIcon.extend`
  position: fixed;
  right: ${props => props.onShow ? '10px' : '-200px'};
  bottom: 110px;
  transition: all 0.4s cubic-bezier(.6, .2, .1, 1) 0s;
`

const PlayBtn = FooterIcon.extend`
  position: fixed;
  right: 10px;
  bottom: 58px;
  i {
    margin-top: -.03rem;
    animation: ${props => props.loading ? 'icon-loading 6s linear infinite' : ''};
  }
`

const LikeCount = styled.div`
  position: fixed;
  right: 10px;
  bottom: 6px;
  display: flex;
  .popup {
    display: none;
    position: absolute;
    right: 56px;
    padding: .12rem .16rem;
    width: 160px;
    text-align: center;
    border-radius: .03rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    background: rgba(255, 255, 255, .6);
    &::before {
      position: absolute;
      content: '';
      width: .12rem;
      height: .12rem;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%) rotate(45deg);
      background: rgba(255, 255, 255, .8);
    }
  }
  &:hover {
    .popup {
      display: block;
    }
  }
`

const LikeBtn = FooterIcon.extend`
  i {
    color: ${props => props.likeChanshiyu ? '#faf' : 'inherit' };
  }
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
  margin: 0 .06rem;
  display: flex;
  align-items: center;
  i {
    margin-right: .03rem;
  }
`

class Footer extends PureComponent {
  componentDidMount() {
    // 加载 waifu!!!
    const initTips = '欢迎来到<font color=#f6f> 蝉時雨 </font>，今天也要元气满满哦！'
    this.dressup({ initLoad: true })
    this.showTips({ initTips })

    // 动态背景
    window.$("body").backstretch(backstretch.bgImg, backstretch.bgOptions)

    // 播放器启动
    this.skPlayer = new skPlayer({
      autoplay: false,
      listshow: true,
      music: {
        type: playerType,
        source: playerType === 'cloud' ? playListId : playList,
      },
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
    // 销毁播放器
    this.skPlayer.destroy()
    this.audio.removeEventListener('play', this.handleListen)
    this.audio.removeEventListener('pause', this.handleListen)

    // 滚动
    document.removeEventListener('scroll', this.handleScroll)
  }

  // 监听播放器状态
  handleListen = e => {
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        isPlaying: e.type === 'play',
      },
    })
  }

  // 监听页面滚动
  handleScroll = e => {
    const osTop = document.documentElement.scrollTop || document.body.scrollTop
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        showTop: osTop >= 200,
      },
    })
  }

  // 换装
  dressup = ({ changeWaifu, initLoad }) => {
    if (window.location.href.includes('http://localhost:8000/')) return
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
        waifu: nextWaifu,
      },
    })

    if (!initLoad) {
      const tiaTips = '我是<font color=#f6f> 姐姐 Tia </font>，有什么需要帮助嘛 (*^_^*)'
      const pioTips = '我是<font color=#f6f> 妹妹 Pio </font>, 来接替姐姐大人的工作哦 (*^_^*)'
      const tips = changeWaifu ? (waifu === 'tia' ? pioTips : tiaTips) : clickTips.dressup
      this.props.dispatch({
        type: 'appModel/showTips',
        payload: {
          tips,
        },
      })
    }
  }

  // 拍照
  takePhoto = () => {
    window.Live2D.captureName = 'waifu.png'
    window.Live2D.captureFrame = true
    this.props.dispatch({
      type: 'appModel/showTips',
      payload: {
        tips: clickTips.takePhoto,
      },
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
      },
    })
  }

  // 隐藏
  hiddenWaifu = () => {
    this.props.dispatch({
      type: 'appModel/hiddenWaifu',
      payload: {
        tips: clickTips.hidden,
      },
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
        },
      })
    }
    setTimeout(() => this.showTips({}), 16000)
  }

  // hover 触发对话
  handleMouseOver = type => {
    const { waifu, likeChanshiyu } = this.props
    let tips = ''
    if (type === 'changeWaifu') {
      tips = `要介绍<font color=#f6f>${
        waifu === 'pio' ? ' 姐姐 Tia ' : ' 妹妹 Pio '
      } </font>给你认识么ヾ(●゜▽゜●)♡`
    } else if (type === 'like') {
      tips = likeChanshiyu ? '已经点赞过了哦 ε٩(๑> ₃ <)۶з ' : '喜欢就点个赞吧 ヾ(●゜▽゜●)♡'
    } else {
      tips = hoverTips[type]
    }
    this.props.dispatch({
      type: 'appModel/showTips',
      payload: {
        tips,
      },
    })
  }

  // 显示隐藏播放器
  togglePlayer = () => {
    const { showPlayer } = this.props
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        showPlayer: !showPlayer,
      },
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
    scroll.animateScroll(header)
  }

  render() {
    const {
      showTop,
      showPlayer,
      isPlaying,
      showWaifu,
      waifu,
      tips,
      lightbulb,
      likeTime,
      likeChanshiyu,
    } = this.props
    return (
      <Container lightbulb={lightbulb} likeChanshiyu={likeChanshiyu}>
        <Waifu showWaifu={showWaifu} waifu={waifu} showTips={!!tips.length}>
          <canvas id="live2d" width="280" height="250" className="live2d" />
          <div className="waifu-tips" dangerouslySetInnerHTML={{ __html: marked(tips) }} />
          <div className="waifu-tool" id="waifu-tool">
            <Link to="/">
              <WaifuBtn
                className="waifu-btn"
                onMouseOver={() => this.handleMouseOver('backHome')}
              >
                <i className="fa fa-university" aria-hidden="true"></i>
              </WaifuBtn>
            </Link>
            <WaifuBtn
              className="waifu-btn"
              onClick={() => this.dressup({ changeWaifu: true })}
              onMouseOver={() => this.handleMouseOver('changeWaifu')}
            >
              <i className="fa fa-venus-double" aria-hidden="true"></i>
            </WaifuBtn>
            <WaifuBtn
              className="waifu-btn"
              onClick={() => this.dressup({ changeWaifu: false })}
              onMouseOver={() => this.handleMouseOver('dressup')}
            >
              <i className="fa fa-female" aria-hidden="true"></i>
            </WaifuBtn>
            <WaifuBtn
              className="waifu-btn"
              onClick={this.takePhoto}
              onMouseOver={() => this.handleMouseOver('takePhoto')}
            >
              <i className="fa fa-camera-retro" aria-hidden="true"></i>
            </WaifuBtn>
            <WaifuBtn
              className="waifu-btn"
              onClick={() => this.showTips({ forced: true })}
              onMouseOver={() => this.handleMouseOver('talk')}
            >
              <i className="fa fa-commenting" aria-hidden="true"></i>
            </WaifuBtn>
            <WaifuBtn
              className="waifu-btn"
              onClick={this.lightbulb}
              onMouseOver={() => this.handleMouseOver('lightbulb')}
            >
              <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
            </WaifuBtn>
            <Link to="/post/4">
              <WaifuBtn
                className="waifu-btn"
                onMouseOver={() => this.handleMouseOver('info')}
              >
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </WaifuBtn>
            </Link>
            <WaifuBtn
              className="waifu-btn"
              onClick={this.hiddenWaifu}
              onMouseOver={() => this.handleMouseOver('hidden')}
            >
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </WaifuBtn>
          </div>
        </Waifu>
        <SkyPlayer
          onShow={showPlayer}
          className="myplayer"
        >
          <div id="skPlayer" />
        </SkyPlayer>
        <ScrollToTop
          onShow={showTop}
          onClick={this.scrollToTop}
          onMouseOver={() => this.handleMouseOver('scroll')}
        >
            <i className="fa fa-chevron-up" aria-hidden="true"></i>
          </ScrollToTop>
        <PlayBtn
          onClick={this.togglePlayer}
          onMouseOver={() => this.handleMouseOver('music')}
          loading={isPlaying}
        >
          <i className="fa fa-music" aria-hidden="true"></i>
        </PlayBtn>
        <LikeCount>
          <div className="popup">
            已有 {likeTime} 人点赞了哦
          </div>
          <LikeBtn
            onClick={this.likeSite}
            onMouseOver={() => this.handleMouseOver('like')}
            likeChanshiyu={likeChanshiyu}
          >
            <i className="fa fa-heart" aria-hidden="true"></i>
          </LikeBtn>
        </LikeCount>
        <InnerWrap>
          <ItemList>
            <Item>
              <i className="fa fa-copyright" aria-hidden="true"></i>
              <span>2017 - 2018</span>
            </Item>
            <Item>
              <i className="fa fa-heartbeat" aria-hidden="true"></i>
              <span>蝉時雨</span>
            </Item>
          </ItemList>
          <ItemList>
            <Item>
              <p>
                Theme - <a href="https://github.com/chanshiyucx/SPA-Blog">HeartBeat</a>
              </p>
            </Item>|
            <Item>
              <p>
                Hosted by <a href="https://pages.coding.me">Coding Pages</a>
              </p>
            </Item>
          </ItemList>
        </InnerWrap>
      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Footer)
