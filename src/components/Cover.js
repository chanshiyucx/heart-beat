import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import config from '../config'

const { duration } = config

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  z-index: 1000;
  @media (max-width: 1200px) {
    display: none;
  }
  animation-duration: ${duration / 1000}s;
  animation-fill-mode: forwards;
`
const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Card = styled.img`
  display: inline-block;
  z-index: ${props => props.isCurr ? 1 : 0};
  width: ${props => props.isCurr ? '40%' : '14%'};
  height: 100%;
  object-fit: cover;
  animation-duration: ${duration / 1000}s;
  animation-fill-mode: forwards;
  transition: all 0.6s cubic-bezier(.6, .2, .1, 1) 0s;
`

const More = styled.div`
  position: fixed;
  right: .2rem;
  bottom: .2rem;
  font-size: 1rem;
  z-index: 10;
`

class Cover extends PureComponent {
  openCover = () => {
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        openCover: true,
      }
    })
  }

  handleMouseOver = (i) => {
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        currCover: i,
      },
    })
  }

  // TODO 渲染一个百叶窗？？？
  renderCard = () => {
    const imgs = [
      'https://dn-coding-net-production-pp.qbox.me/18fea7a2-22d7-4688-84b4-0da4db042813.png',
      'https://dn-coding-net-production-pp.qbox.me/18fea7a2-22d7-4688-84b4-0da4db042813.png',
      'https://dn-coding-net-production-pp.qbox.me/18fea7a2-22d7-4688-84b4-0da4db042813.png',
      'https://dn-coding-net-production-pp.qbox.me/18fea7a2-22d7-4688-84b4-0da4db042813.png',
      'https://dn-coding-net-production-pp.qbox.me/18fea7a2-22d7-4688-84b4-0da4db042813.png',
    ]
    const { currCover, openCover } = this.props
    const CardList = imgs.map((o, i) => {
      return (
        <Card
          key={o}
          src={o}
          isCurr={currCover === i}
          className={openCover ? (i % 2 === 0 ? 'back-out-up' : 'back-out-down') : '' }
          onMouseOver={() => this.handleMouseOver(i)}
        />
      )
    })
    return CardList
  }

  render() {
    return (
      <Container>
        <Wrapper>
            { this.renderCard() }
        </Wrapper>
        <More onClick={this.openCover}>
          つづく
        </More>
      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Cover)
