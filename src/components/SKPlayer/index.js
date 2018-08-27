/** 
 * @Author: chenxin 
 * @Date: 2018-06-30 10:31:06 
 * @Last Modified by: chenxin
 * @Last Modified time: 2018-08-27 14:40:01
 * Description: 音乐播放器
 */

import React, { PureComponent } from 'react'
import classNames from 'classnames/bind'

import Transition from '../Transition'
import styles from './index.less'
import { isMobile } from '../../utils'
import config from '../../config'

const cx = classNames.bind(styles)
const { skPlayerOption } = config
const { autoplay = false, listshow = true, mode = 'listloop', source = [] } = skPlayerOption

const Util = {
  leftDistance: (el) => {
    let left = el.offsetLeft
    let scrollLeft
    while (el.offsetParent) {
      el = el.offsetParent
      left += el.offsetLeft
    }
    scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft
    return left - scrollLeft
  },
  timeFormat: (time) => {
    let tempMin = parseInt(time / 60, 10)
    let tempSec = parseInt(time % 60, 10)
    let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin
    let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec
    return `${curMin}:${curSec}`
  },
  percentFormat: (percent) => {
    return `${(percent * 100).toFixed(2)}%`
  },
}

class SKPlayer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      autoplay,                     // 自动播放
      listshow,                     // 展开列表
      mode,                         // 播放模式
      playerIndex: 0,               // 当前播放索引
      isPlaying: false,             // 是否正在播放
      muted: false,                 // 是否静音
      timetext_total: '00:00',      // 歌曲总时长
      timetext_played: '00:00',     // 歌曲当前播放进度
    }

    this.music = source
    this.isMobile = isMobile
  }

  componentDidMount() {
    this.createPlayer()
  }

  componentWillUnmount() {
    this.removeBind()
  }

  // 创建播放器
  createPlayer = () => {
    if (!this.music.length) {
      console.error('请正确配置音乐播放器！')
      return
    }
    this.bind()
  }


  // 绑定事件
  bind = () => {
    this.audio.addEventListener('durationchange', this.durationchange)
    this.audio.addEventListener('progress', this.progress)
    this.audio.addEventListener('canplay', this.canplay)
    this.audio.addEventListener('timeupdate', this.timeupdate)
    this.audio.addEventListener('seeked', this.seeked)
    this.audio.addEventListener('ended', this.next)

    this.playbutton.addEventListener('click', this.toggle)
    this.switchbutton.addEventListener('click', this.toggleList)
    this.modebutton.addEventListener('click', this.switchMode)
    this.musiclist.addEventListener('click', this.musiclistClick)
    this.skPlayerPercent.addEventListener('click', this.timelineClick)
    if (!this.isMobile) {
      this.volumebutton.addEventListener('click', this.toggleMute)
      this.volumelineTotal.addEventListener('click', this.volumelineClick)
    }
  }

  // 注销事件
  removeBind = () => {
    this.audio.removeEventListener('durationchange', this.durationchange)
    this.audio.removeEventListener('progress', this.progress)
    this.audio.removeEventListener('canplay', this.canplay)
    this.audio.removeEventListener('timeupdate', this.timeupdate)
    this.audio.removeEventListener('seeked', this.seeked)
    this.audio.removeEventListener('ended', this.ended)

    this.playbutton.removeEventListener('click', this.toggle)
    this.switchbutton.removeEventListener('click', this.toggleList)
    this.modebutton.removeEventListener('click', this.switchMode)
    this.musiclist.removeEventListener('click', this.musiclistClick)
    this.skPlayerPercent.removeEventListener('click', this.timelineClick)
    if (!this.isMobile) {
      this.volumebutton.removeEventListener('click', this.toggleMute)
      this.volumelineTotal.removeEventListener('click', this.volumelineClick)
    }
  }

  // 监听：歌曲时长
  durationchange = (e) => {
    const timetext_total = Util.timeFormat(this.audio.duration)
    this.setState({ timetext_total })
    this.updateLine()
  }

  // 监听：播放进度
  progress = (e) => {
    this.updateLine()
  }

  // 监听：是否可以播放
  canplay = (e) => {
    if (this.state.autoplay && !this.isMobile) {
      this.play()
    }
  }

  // 监听：播放时间
  timeupdate = () => {
    let percent = this.audio.currentTime / this.audio.duration
    this.skPlayerPlayed.style.width = Util.percentFormat(percent)
    const timetext_played = Util.timeFormat(this.audio.currentTime)
    this.setState({ timetext_played })
  }

  // 监听：加载完成
  seeked = () => {
    this.play()
  }

  // 监听：播放结束
  ended = () => {
    this.next()
  }

  // 监听: 播放/暂停
  toggle = () => {
    this.state.isPlaying ? this.pause() : this.play()
  }

  // 监听: 展开/隐藏列表
  toggleList = () => {
    this.setState({ listshow: !this.state.listshow })
  }

  // 监听: 打开/关闭静音
  toggleMute = () => {
    if (this.state.muted) {
      this.setState({ muted: false })
      this.volumelineValue.style.width = Util.percentFormat(this.audio.volume)
    } else {
      this.setState({ muted: true })
      this.volumelineValue.style.width = '0%'
    }
  }

  // 监听: 切换模式
  switchMode = () => {
    const mode = this.state.mode === 'listloop' ? 'singleloop' : 'listloop'
    this.setState({ mode })
  }

  // 监听: 切换音乐
  musiclistClick = (e) => {
    let target, index, curIndex
    if (e.target.tagName.toUpperCase() === 'LI') {
      target = e.target
    } else if (e.target.parentElement.tagName.toUpperCase() === 'LI') {
      target = e.target.parentElement
    } else {
      return
    }
    index = parseInt(target.getAttribute('data-index'), 10)
    curIndex = this.state.playerIndex
    if (index === curIndex) {
      this.play()
    } else {
      this.switchMusic(index + 1)
    }
  }

  // 监听: 跳转进度
  timelineClick = (event) => {
    let e = event || window.event
    let percent = (e.clientX - Util.leftDistance(this.skPlayerPercent)) / this.skPlayerPercent.clientWidth
    if (!isNaN(this.audio.duration)) {
      this.skPlayerPlayed.style.width = Util.percentFormat(percent)
      this.audio.currentTime = percent * this.audio.duration
      const timetext_played = Util.timeFormat(percent * this.audio.duration)
      this.setState({ timetext_played })
    }
  }

  // 监听: 调整音量
  volumelineClick = (event) => {
    let e = event || window.event
    let percent = (e.clientX - Util.leftDistance(this.volumelineTotal)) / this.volumelineTotal.clientWidth
    this.volumelineValue.style.width = Util.percentFormat(percent)
    this.audio.volume = percent
    if (this.audio.muted) {
      this.toggleMute()
    }
  }

  // 更新播放进度条
  updateLine = () => {
    let percent = this.audio.buffered.length ? (this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration) : 0
    this.skPlayerLoaded.style.width = Util.percentFormat(percent)
  }

  // 前一首
  prev = () => {
    const index = this.state.playerIndex
    if (index === 0) {
      if (this.music.length === 1) {
        this.play()
      } else {
        this.switchMusic(this.music.length - 1 + 1)
      }
    } else {
      this.switchMusic(index - 1 + 1)
    }
  }

  // 后一首
  next = () => {
    const index = this.state.playerIndex
    if (index === (this.music.length - 1)) {
      if (this.music.length === 1) {
        this.play()
      } else {
        this.switchMusic(0 + 1)
      }
    } else {
      this.switchMusic(index + 1 + 1)
    }
  }

  // 切换歌曲
  switchMusic = (index) => {
    if (typeof index !== 'number') {
      console.error('请输入正确的歌曲序号！')
      return
    }
    index -= 1
    if (index < 0 || index >= this.music.length) {
      console.error('请输入正确的歌曲序号！')
      return
    }
    if (index === this.state.playerIndex) {
      this.play()
      return
    }

    this.setState({ playerIndex: index }, () => {
      this.play()
    })
  }

  // 播放
  play = () => {
    if (this.audio.paused) {
      this.audio.play()
      this.setState({ isPlaying: true })
      this.props.handlePlaying(true)
    }
  }

  // 暂停
  pause = () => {
    if (!this.audio.paused) {
      this.audio.pause()
      this.setState({ isPlaying: false })
      this.props.handlePlaying(false)
    }
  }

  // 播单列表
  template = () => {
    const list = this.music.map((item, index) => {
      return (
        <li data-index={index} key={index} class={cx(this.state.playerIndex === index && 'skPlayer-curMusic')}>
          <i class={cx('skPlayer-list-sign')}></i>
          <span class={cx('skPlayer-list-index')}>{index + 1}</span>
          <span class={cx('skPlayer-list-name')} title={item.name}>{item.name}</span>
          <span class={cx('skPlayer-list-author')} title={item.author}>{item.author}</span>
        </li>
      )
    })
    return list
  }

  render() {
    const {
      listshow,
      mode,
      playerIndex,
      isPlaying,
      muted,
      timetext_total,
      timetext_played,
    } = this.state
    const curMusic = this.music[playerIndex]

    return (
      <div id="skPlayer" class={cx('skPlayer')}>
        <audio
          ref={c => this.audio = c}
          class={cx('skPlayer-source')}
          src={curMusic.src}
          preload="auto"
          loop={mode === 'singleloop'}
          muted={muted}
        />
        <Transition visible={listshow} animation='horizontal flip' duration={600}>
          <ul ref={c => this.musiclist = c} class={cx('skPlayer-list')}>
            {this.template()}
          </ul>
        </Transition>

        <div class={cx('skPlayer-body')}>
          <div class={cx('skPlayer-picture')}>
            <img class={cx('skPlayer-cover', isPlaying && 'skPlayer-pause')} src={curMusic.cover} alt="" />
            <div ref={c => this.playbutton = c} class={cx('skPlayer-play-btn', isPlaying && 'skPlayer-pause')}>
              <span class={cx('skPlayer-left')}></span>
              <span class={cx('skPlayer-right')}></span>
            </div>
          </div>
          <div class={cx('skPlayer-control')}>
            <p class={cx('skPlayer-name')}>{curMusic.name}</p>
            <p class={cx('skPlayer-author')}>{curMusic.author}</p>
            <div ref={c => this.skPlayerPercent = c} class={cx('skPlayer-percent')}>
              <div ref={c => this.skPlayerLoaded = c} class={cx('skPlayer-line-loading')} ></div>
              <div ref={c => this.skPlayerPlayed = c} class={cx('skPlayer-line')}></div>
            </div>
            <p class={cx('skPlayer-time')}>
              <span class={cx('skPlayer-cur')}>{timetext_total}</span>/<span class="skPlayer-total">{timetext_played}</span>
            </p>
            <div class={cx('skPlayer-volume')} style={this.isMobile ? 'display:none;' : ''}>
              <i ref={c => this.volumebutton = c} class={cx('skPlayer-icon', muted && 'skPlayer-quiet')}></i>
              <div ref={c => this.volumelineTotal = c} class={cx('skPlayer-percent')}>
                <div ref={c => this.volumelineValue = c} class={cx('skPlayer-line')}></div>
              </div>
            </div>
            <div ref={c => this.switchbutton = c} class={cx('skPlayer-list-switch')}>
              <i class="fa fa-list-ul" aria-hidden="true"></i>
            </div>
            <i ref={c => this.modebutton = c} class={cx('skPlayer-mode', mode === 'singleloop' && 'skPlayer-mode-loop')}></i>
          </div>
        </div>
      </div>
    )
  }
}

export default SKPlayer