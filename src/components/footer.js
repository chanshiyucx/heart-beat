import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Button, Icon, Transition } from 'semantic-ui-react'
import SmoothScroll from 'smooth-scroll'
import skPlayer from 'skplayer'

import config from '../config'
const { duration, playerId } = config

const scroll = new SmoothScroll()

const Container = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%;
`

const SkyPlayer = styled.div`
  position: fixed;
  right: 10px;
  bottom: 330px;
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
  bottom: 20px;
  color: rgba(255, 255, 255, .8)!important;
  background: transparent!important;
  &:hover {
    color: rgba(0, 0, 0, .2)!important;
  }
`

const PlayerIcon = FooterIcon.extend`
  bottom: 80px;
  @media (max-width: 900px) {
    display: none;
  }
`

const ScrollToTop = FooterIcon.extend`
  bottom: 20px;
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
        type: 'cloud',
        source: playerId
      }
    })
  }

  componentWillUnmount() {
    this.skPlayer.destroy()
  }

  // 显示隐藏播放器
  togglePlayer = () => {
    const { showPlayer } = this.props
    this.props.dispatch({
      type: 'site/update',
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
    const { showPlayer } = this.props
    console.log('showPlayer--->', showPlayer)
    return (
      <Container>
        <Transition visible={showPlayer} mountOnShow={false} animation='fly left' duration={duration}>
          <SkyPlayer className="myplayer">
            <div id="skPlayer"></div>
          </SkyPlayer>
        </Transition>
        <PlayerIcon icon onClick={this.togglePlayer}>
          <Icon name='music' size='big' bordered circular loading={showPlayer}/>
        </PlayerIcon>
        <ScrollToTop icon onClick={this.scrollToTop}>
          <Icon name='chevron up' size='big'  bordered circular/>
        </ScrollToTop>
        <InnerWrap>
          <ItemList>
            <Item>
              <span><Icon name='copyright' /> </span>
              <span>2017</span>
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

export default connect(({ site }) => ({ ...site }))(Footer)
