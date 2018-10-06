import React, { PureComponent } from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import _ from 'lodash'
import classNames from 'classnames/bind'
import SmoothScroll from 'smooth-scroll'

import MarkeDown from '../MarkDown'
import Transition from '../Transition'
import SKPlayer from '../SKPlayer'
import styles from './index.less'

// 看板娘
import '../../assets/live2d/live2d.min'
import model from '../../assets/live2d/waifu.json'
import tips from '../../assets/live2d/tips.json'

const costume = {
  pio: [
    'https://i.loli.net/2018/10/06/5bb8615aa1e81.png',
    'https://i.loli.net/2018/10/06/5bb8615b600d0.png',
    'https://i.loli.net/2018/10/06/5bb8615b85583.png',
    'https://i.loli.net/2018/10/06/5bb8615bc457f.png',
    'https://i.loli.net/2018/10/06/5bb8615c033fe.png',
    'https://i.loli.net/2018/10/06/5bb8625474429.png',
    'https://i.loli.net/2018/10/06/5bb862547ee3e.png',
    'https://i.loli.net/2018/10/06/5bb8625481cfc.png',
    'https://i.loli.net/2018/10/06/5bb8625485fc2.png',
    'https://i.loli.net/2018/10/06/5bb8625487c84.png',
    'https://i.loli.net/2018/10/06/5bb86254869d0.png',
    'https://i.loli.net/2018/10/06/5bb86321d6d71.png',
  ],
  tia: [
    'https://i.loli.net/2018/10/06/5bb85a0f18664.png',
    'https://i.loli.net/2018/10/06/5bb85d5ceaeca.png',
    'https://i.loli.net/2018/10/06/5bb85d5d0028f.png', 
    'https://i.loli.net/2018/10/06/5bb85ea1bb1a5.png',
    'https://i.loli.net/2018/10/06/5bb85ea1bf9ad.png',
    'https://i.loli.net/2018/10/06/5bb85ea1c3757.png',
    'https://i.loli.net/2018/10/06/5bb85ea1c448f.png',
    'https://i.loli.net/2018/10/06/5bb85f8f84b16.png',
    'https://i.loli.net/2018/10/06/5bb85f8f8a512.png',
    'https://i.loli.net/2018/10/06/5bb85f8f8d3e9.png',
    'https://i.loli.net/2018/10/06/5bb85f8f90422.png',
    'https://i.loli.net/2018/10/06/5bb8609e0bbe2.png',
  ]
}

const { waifuClick, hoverTips, clickTips, hitokotos } = tips
const cx = classNames.bind(styles)
const scroll = new SmoothScroll()

class Footer extends PureComponent {
  constructor(props) {
    super(props)
    this.onLoadWaifu = false   // 看板娘已经加载完成
    this.state = {
      waifu: 'tia',            // 默认看板娘
      showWaifu: true,         // 是否显示看板娘
      showScrollTop: false,    // 是否显示滚动到顶部按钮
      showPlayer: false,       // 是否显示音乐播放器
      isPlying: false,         // 是否正在播放音乐
    }
  }

  componentDidMount() {   
    this.bind()                // 绑定事件

    setTimeout(() => {
      this.dressup()
    }, 500)
  }

  // 绑定事件
  bind = () => {
    this.THandleScroll = _.throttle(this.handleScroll, 400, { trailing: true })
    this.TWaifuClick = _.throttle(this.waifuClick, 400, { trailing: true })
    this.TToolCMouseOver = _.throttle(this.toolMouseOver, 400, { trailing: true })
    this.TRightBtnWapperMouseOver = _.throttle(this.rightBtnWapperMouseOver, 400, { trailing: true })

    document.addEventListener('scroll', this.THandleScroll)
    this.waifu.addEventListener('click', this.TWaifuClick)
    this.tool.addEventListener('click', this.toolClick)
    this.tool.addEventListener('mouseover', this.TToolCMouseOver)
    this.rightBtnWapper.addEventListener('click', this.rightBtnWapperClick)
    this.rightBtnWapper.addEventListener('mouseover', this.TRightBtnWapperMouseOver)
  }

  // 监听：页面滚动
  handleScroll = e => {
    const osTop = document.documentElement.scrollTop || document.body.scrollTop
    if (osTop > 50 && !this.state.showScrollTop) {
      this.setState({ showScrollTop: true })
    } else if (osTop <= 50 && this.state.showScrollTop) {
      this.setState({ showScrollTop: false })
    }
  }

  // 监听：点击看板娘
  waifuClick = () => {
    const { dispatch, tips } = this.props
    const index = _.random(0, waifuClick.length - 1)
    const nextTips = waifuClick[index]
    if (tips === nextTips) { // 相同提示则继续生成
      this.waifuClick()
    } else {
      dispatch({
        type: 'global/showTips',
        payload: { tips: nextTips },
      })
    }
  }

  // 监听：点击工具栏
  toolClick = e => {
    let target
    if (e.target.tagName.toUpperCase() === 'LI') {
      target = e.target
    } else if (e.target.parentElement.tagName.toUpperCase() === 'LI') {
      target = e.target.parentElement
    } else {
      return
    }
    const type = target.getAttribute('data-type')
    switch (type) {
      case 'home': 
        router.push('/')
        break
      case 'switch':
        this.dressup(true)
        break
      case 'dressup':
        this.dressup()
        break
      case 'takephoto':
        window.Live2D.captureName = 'waifu.png'
        window.Live2D.captureFrame = true
        this.props.dispatch({
          type: 'appModel/showTips',
          payload: { tips: clickTips.takePhoto },
        })
        break
      case 'talk':
        const index = _.random(0, hitokotos.length - 1)
        const nextTips = hitokotos[index].hitokoto
        this.props.dispatch({
          type: 'global/showTips',
          payload: { tips: nextTips },
        })
        break
      case 'info':
        router.push('/about')
        break
      case 'close':
        this.props.dispatch({
          type: 'global/showTips',
          payload: { tips: clickTips.close },
        })
        setTimeout(() => {
          this.setState({ showWaifu: false })
        }, 2000)
        break
      default:
        return
    }
  }

  // 监听：工具栏触发看板娘对话
  toolMouseOver = e => {
    let target, tips
    if (e.target.tagName.toUpperCase() === 'LI') {
      target = e.target
    } else if (e.target.parentElement.tagName.toUpperCase() === 'LI') {
      target = e.target.parentElement
    } else {
      return
    }
    const type = target.getAttribute('data-type')
    if (type === 'switch') {
      tips = `要介绍<font color=#f6f>${this.state.waifu === 'pio' ? ' 姐姐 Tia ' : ' 妹妹 Pio '} </font>给你认识么ヾ(●゜▽゜●)♡`
    } else {
      tips = hoverTips[type]
    }
    if (!tips) return
    this.props.dispatch({
      type: 'global/showTips',
      payload: { tips },
    })
  }

  // 监听：右下角按钮触发看板娘对话
  rightBtnWapperMouseOver = e => {
    let target, index
    if (e.target.tagName.toUpperCase() === 'LI') {
      target = e.target
    } else if (e.target.parentElement.tagName.toUpperCase() === 'LI') {
      target = e.target.parentElement
    } else {
      return
    }
    index = parseInt(target.getAttribute('data-index'), 10)
    let tips = ''
    if (index === 0) {          // 覆盖滚动按钮
      tips = hoverTips.scrollBtn
    } else if (index === 1) {   // 覆盖音乐按钮 
      tips = hoverTips.playerBtn
    } else {                    // 覆盖喜欢按钮
      tips = hoverTips.likeBtn
      this.setState({ showLikeTimes: true })
    }
    this.props.dispatch({
      type: 'global/showTips',
      payload: { tips },
    })
  }

  // 监听：右下角按钮点击
  rightBtnWapperClick = e => {
    let target, index
    if (e.target.tagName.toUpperCase() === 'LI') {
      target = e.target
    } else if (e.target.parentElement.tagName.toUpperCase() === 'LI') {
      target = e.target.parentElement
    } else {
      return
    }
    index = parseInt(target.getAttribute('data-index'), 10)
    if (index === 0) {          // 点击滚动按钮
      scroll.animateScroll(0)
    } else if (index === 1) {   // 点击音乐按钮 
      this.setState({ showPlayer: !this.state.showPlayer })
    } else {                    // 点击喜欢按钮
      this.likeSite()
    }
  }

  // 喜欢小站
  likeSite = () => {
    const { isLikeSite } = this.props
    if (isLikeSite) return
    this.props.dispatch({
      type: 'global/likeSite',
    })
  }

  // 换装
  dressup = switchWaifu => {
    const { waifu } = this.state
    const nextWaifu = switchWaifu ? (waifu === 'tia' ? 'pio' : 'tia') : waifu
    const path = `${window.publicPath}live2d/`

    this.setState({ waifu: nextWaifu })

    const waifuCostume = costume[nextWaifu]
    let textures = waifuCostume[_.random(0, waifuCostume.length - 1)]
    while (this.textures === textures) {
      textures = waifuCostume[_.random(0, waifuCostume.length - 1)]
    }
    this.textures = textures
    model.model = `moc/${nextWaifu || 'tia'}.moc`
    model.textures = [textures]
    window.modelObj = model
    window.loadlive2d('live2d', path, '')

    if (!this.onLoadWaifu) {
      this.onLoadWaifu = true
      this.loopTips()
    }
  }

  // 一言轮播
  loopTips = () => {
    setTimeout(() => {
      this.loopTips()
    }, 16000)
    const { dispatch, tips, lastTipsUpdateAt } = this.props
    if (tips || (lastTipsUpdateAt !== '' && (new Date() - lastTipsUpdateAt) < 6000)) return
    const index = _.random(0, hitokotos.length - 1)
    const nextTips = hitokotos[index].hitokoto
    dispatch({
      type: 'global/showTips',
      payload: { tips: nextTips },
    })
  }

  // 正在播放
  handlePlaying = isPlying => {
    this.setState({ isPlying })
  }

  render({ tips, isLikeSite, likeTimes }, { waifu, showWaifu, showScrollTop, showPlayer, isPlying }) {
    return (
      <div class={cx('container')}>
        {showWaifu && (
          <div class={cx('waifu')}>
            <div class={cx('waifu-tips', !tips && 'hide', waifu === 'tia' && 'tia')}>
              <MarkeDown content={tips} />
            </div>
            <canvas ref={c => this.waifu = c} id="live2d" width="280" height="250" />
            <ul ref={c => this.tool = c} class={cx('waifu-tool')}>
              <li data-type='home'>
                <i className="fa fa-university" aria-hidden="true"></i>
              </li>
              <li data-type='switch'>
                <i className="fa fa-venus-double" aria-hidden="true"></i>
              </li>
              <li data-type='dressup'>
                <i className="fa fa-female" aria-hidden="true"></i>
              </li>
              <li data-type='takephoto'>
                <i className="fa fa-camera-retro" aria-hidden="true"></i>
              </li>
              <li data-type='talk'>
                <i className="fa fa-commenting" aria-hidden="true"></i>
              </li>
              <li data-type='info'>
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </li>
              <li data-type='close'>
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </li>
            </ul>
          </div>
        )}

        <div class={cx('site-desc')}>
          <div class={cx('site-desc-row')}>
            <p>
              <i className="fa fa-copyright" aria-hidden="true" style={{ marginTop: '-.02rem' }}></i>
              <span>2017 - 2018</span>
            </p>
            <p>
              <i className="fa fa-heartbeat" aria-hidden="true"></i>
              <span>蝉時雨</span>
            </p>
          </div>
          <div class={cx('site-desc-row')}>
            <p>
              Theme&nbsp;-<a href="https://github.com/chanshiyucx/HeartBeat">&nbsp;HeartBeat</a>
            </p>|
            <p>
              蝉鸣如雨 - 花宵道中
            </p>
          </div>
        </div>

        <Transition visible={showPlayer} animation='fade left' duration={600}>
          <div class={cx('player-wapper')}>
            <SKPlayer handlePlaying={this.handlePlaying} />
          </div>
        </Transition>
        <ul ref={c => this.rightBtnWapper = c} class={cx('right-btn-wapper')}>
          <Transition visible={showScrollTop} animation='zoom' duration={600}>
            <li class={cx('right-btn', 'scroll-btn')} data-index="0">
              <i class="fa fa-chevron-up" aria-hidden="true"></i>
            </li>
          </Transition>
          <li class={cx('right-btn', 'player-btn', showPlayer && !isPlying && 'reserve', isPlying && 'rotate')} data-index="1">
            <i class="fa fa-music" aria-hidden="true"></i>
          </li>
          <li class={cx('right-btn', 'like-btn')} data-index="2">
            <i class="fa fa-heart" style={{ color: isLikeSite && '#f8f' }} aria-hidden="true"></i>
            <div class={cx('popup')}>
              已有 {likeTimes} 人点赞了哦！
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(({ global }) => ({
  tips: global.tips,
  isLikeSite: global.isLikeSite,
  likeTimes: global.likeTimes,
}))(Footer)


