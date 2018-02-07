import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

import { throttle } from '../utils'

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  z-index: 1000;
  ${props => props.onHide ? 'display: none;' : ''}
  @media (max-width: 1200px) {
    display: none;
  }
`
const Wrapper = styled.ul`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Card = styled.li`
  display: inline-block;
  z-index: ${props => props.isCurr ? 1 : 0};
  width: ${props => props.isCurr ? '52%' : '12%'};
  height: 100%;
  object-fit: cover;
  animation-duration: .6s;
  animation-fill-mode: forwards;
  transition: all 0.5s cubic-bezier(.6, .2, .1, 1) 0s;
  background: url(${props => props.src}) no-repeat center/cover;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
  }
`

const More = styled.a`
  position: fixed;
  right: .2rem;
  bottom: .1rem;
  font-size: 1rem;
  color: #888;
  z-index: 10;
`

class Cover extends PureComponent {
  componentDidMount() {
    const node = document.getElementById('wrapper')
    node.addEventListener('mouseover', throttle(this.handleMouseOver, 600, {trailing: true}))

    // 监听动画结束
    this.performAndDisapper()
  }

  // 监听动画结束，其他方法都太复杂了QAQ
  performAndDisapper = () => {
    if (!this.Card) this.Card = document.getElementById('card-0');
    this.Card.addEventListener('animationend', this.animationEnd)
  }

  // 动画结束
  animationEnd = () => {
    console.log('endddd')
    const { hideCover } = this.props
    // 如果动画结束数据还未加载，那么隐藏
    if (hideCover) {
      console.log('隐藏！！！')
      this.props.dispatch({
        type: 'appModel/update',
        payload: {
          coverOnHide: true,
        },
      })
    }
  }


  // 隐藏启动图
  hideCover = () => {
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        hideCover: true,
      }
    })
  }

  // 处理图片放大
  handleMouseOver = (e) => {
    const curr = e.target.id.split('-')[1]
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        currCover: +curr,
      },
    })
  }

  // TODO 渲染一个百叶窗？？？
  renderCard = () => {
    const imgs = [
      'https://dn-coding-net-production-pp.qbox.me/be7f2f1c-51f1-40ef-9ab9-7b453153dd6e.jpg',
      'https://dn-coding-net-production-pp.qbox.me/be7f2f1c-51f1-40ef-9ab9-7b453153dd6e.jpg',
      'https://dn-coding-net-production-pp.qbox.me/42388d66-ecb0-41a2-a57c-88d90feabbfc.jpg',
      'https://dn-coding-net-production-pp.qbox.me/42388d66-ecb0-41a2-a57c-88d90feabbfc.jpg',
      'https://dn-coding-net-production-pp.qbox.me/42388d66-ecb0-41a2-a57c-88d90feabbfc.jpg',
    ]
    const { currCover, hideCover } = this.props
    const CardList = imgs.map((o, i) => {
      return (
        <Card
          id={`card-${i}`}
          key={i}
          src={o}
          isCurr={currCover === i}
          className={hideCover ? (i % 2 === 0 ? 'back-out-up' : 'back-out-down') : '' }
        />
      )
    })
    return CardList
  }

  render() {
    const { coverOnHide, hideCover } = this.props
    return (
      <Container onHide={coverOnHide}>
        <Wrapper id="wrapper">
            { this.renderCard() }
        </Wrapper>
        <More 
          className={hideCover ? 'fade-out' : '' }
          onClick={this.hideCover} 
        >
          つづく
        </More>
      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Cover)
