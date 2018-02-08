import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled, { keyframes } from 'styled-components'
import SmoothScroll from 'smooth-scroll'
import marked from 'marked'
import skPlayer from 'skplayer'

import { throttle } from '../utils'
import config from '../config'
const { playerBg, playerType, playListId, playList, backstretch, transitions } = config
const { show, hide } = transitions.footer

// 一言
const hitokoto = require('../assets/hitokoto.json')
const hitokotos = JSON.parse(JSON.stringify(hitokoto, null, 2)).hitokotos

// waifu
const model = require('../assets/waifu.json')
const modelObj = JSON.parse(JSON.stringify(model, null, 2))

// 滚动
const scroll = new SmoothScroll()

// 动画
const rotate = keyframes`{
  0% {transform: rotate(0deg); }
  100%{ transform: rotate(360deg); }
}`

const degs = [-.5, .5, 1.5]
const trans = [.5, 1.5, 2.5, -1.5, -.5]
let shakeStr = ''
for (let i = 0; i <= 100; i = i + 2) {
  const deg = degs[Math.floor(Math.random() * 3)]
  const x = trans[Math.floor(Math.random() * 5)]
  const y = trans[Math.floor(Math.random() * 5)]
  shakeStr += `${i}% {transform: translate(${x}px, ${y}px) rotate(${deg}deg);}`
}
const shake = keyframes`${shakeStr}`

// 提示
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
  padding-bottom: .04rem;
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
    color: ${props => (props.likeChanshiyu ? '#faf' : '')};
  }
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
    min-height: 46px;
    margin: ${props => (props.waifu === 'pio' ? 0 : '-30px')} 20px;
    padding: .05rem .1rem;
    border-radius: .08rem;
    background-color: rgba(255, 255, 255, .6);
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    font-size: .12rem;
    line-height: .22rem;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-name: ${shake};
    animation-timing-function: ease-in-out;
  }
  .waifu-tool {
    display: block;
    position: absolute;
    bottom: 6px;
    left: 0;
    width: .2rem;
    z-index: 999;
    i {
      font-size: .16rem;
    }
  }
  @media (max-width: 900px) {
    display: none;
  }
`

const WaifuBtn = styled.button`
  width: .2rem;
  height: .2rem;
  // margin: .04rem 0;
  color: #444;
  border: none;
  outline: 0;
  background: transparent;
`

const SkyPlayer = styled.div`
  position: fixed;
  right: 10px;
  bottom: 334px;
  margin-right: ${props => props.initFlag ? '-600px' : '0'};
  animation-duration: 1.2s;
  animation-fill-mode: forwards;
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
  width: .18rem;
  height: .18rem;
  outline: 0;
  box-sizing: content-box;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, .2);
  background: transparent;
  i {
    font-size: .2rem;
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
  right: 10px;
  bottom: 110px;
  margin-right: ${props => props.initFlag ? '-100px' : '0'};
  animation-duration: 1.2s;
  animation-fill-mode: forwards;
  i {
    margin-top: -.02rem;
  }
`

const PlayBtn = FooterIcon.extend`
  position: fixed;
  right: 10px;
  bottom: 58px;
  i {
    margin: -.02rem 0 0 -.01rem;
    transform: ${props => props.showPlayer && !props.loading ? 'rotateY(180deg)' : 'none' };
    animation: ${props => props.loading ? rotate + ' 6s linear infinite' : 'none'};
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
    margin-left: -.01rem;
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
  componentWillMount() {
    this.playerInitFlag = true
    this.scrollInitFlag = true
  }

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
    this.addPlayerListener()

    // 滚动
    document.addEventListener('scroll', throttle(this.handleScroll, 400, {trailing: true}))

    // hover 事件
    this.tool = document.getElementById('waifu-tool')
    this.tool.addEventListener('mouseover', throttle(this.handleMouseOver, 100, {trailing: true}))
  }

  componentWillUnmount() {
    // 销毁播放器
    this.skPlayer.destroy()
    this.audio.removeEventListener('play', this.handleListen)
    this.audio.removeEventListener('pause', this.handleListen)

    // 滚动
    document.removeEventListener('scroll', this.handleScroll)

    // hover
    this.tool.removeEventListener('mouseover', this.handleMouseOver)
  }

  // 添加监听器
  addPlayerListener = () => {
    this.audio = document.querySelector('audio')
    if (this.audio) {
      this.audio.addEventListener('play', this.handleListen)
      this.audio.addEventListener('pause', this.handleListen)
    } else {
      setTimeout(this.addListener, 2000)
    }
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
    this.scrollInitFlag = false
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        showTop: osTop > 50,
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
  handleMouseOver = e => {
    const { id } = e.target
    if (!id || !id.includes('waifu-') || id === 'waifu-tool') return
    console.log('eee', id)
    const type = id.split('-')[1]
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
    console.log('tips', tips)
    if (!tips) return
    this.props.dispatch({
      type: 'appModel/showTips',
      payload: {
        tips,
      },
    })
  }

  // 显示隐藏播放器
  togglePlayer = () => {
    this.playerInitFlag = false
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
                id="waifu-backHome"
              >
                <i className="fa fa-university" aria-hidden="true"></i>
              </WaifuBtn>
            </Link>
            <WaifuBtn
              className="waifu-btn"
              id="waifu-changeWaifu"
              onClick={() => this.dressup({ changeWaifu: true })}
            >
              <i className="fa fa-venus-double" aria-hidden="true"></i>
            </WaifuBtn>
            <WaifuBtn
              className="waifu-btn"
              id="waifu-dressup"
              onClick={() => this.dressup({ changeWaifu: false })}
            >
              <i className="fa fa-female" aria-hidden="true"></i>
            </WaifuBtn>
            <WaifuBtn
              className="waifu-btn"
              id="waifu-takePhoto"
              onClick={this.takePhoto}
            >
              <i className="fa fa-camera-retro" aria-hidden="true"></i>
            </WaifuBtn>
            <WaifuBtn
              className="waifu-btn"
              id="waifu-talk"
              onClick={() => this.showTips({ forced: true })}
            >
              <i className="fa fa-commenting" aria-hidden="true"></i>
            </WaifuBtn>
            <WaifuBtn
              className="waifu-btn"
              id="waifu-lightbulb"
              onClick={this.lightbulb}
            >
              <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
            </WaifuBtn>
            <Link to="/post/4">
              <WaifuBtn
                className="waifu-btn"
                id="waifu-info"
              >
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </WaifuBtn>
            </Link>
            <WaifuBtn
              className="waifu-btn"
              id="waifu-hidden"
              onClick={this.hiddenWaifu}
            >
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </WaifuBtn>
          </div>
        </Waifu>
        <SkyPlayer
          initFlag={this.playerInitFlag}
          className={showPlayer ? show : hide}
        >
          <div id="skPlayer" />
        </SkyPlayer>
        <ScrollToTop
          id="waifu-scroll"
          onClick={this.scrollToTop}
          initFlag={this.scrollInitFlag}
          className={showTop ? show : hide}
        >
            <i className="fa fa-chevron-up" aria-hidden="true"></i>
          </ScrollToTop>
        <PlayBtn
          id="waifu-music"
          onClick={this.togglePlayer}
          loading={isPlaying}
          showPlayer={showPlayer}
        >
          <i className="fa fa-music" aria-hidden="true"></i>
        </PlayBtn>
        <LikeCount>
          <div className="popup">
            已有 {likeTime} 人点赞了哦
          </div>
          <LikeBtn
            id="waifu-like"
            onClick={this.likeSite}
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
