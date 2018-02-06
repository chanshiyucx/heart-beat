import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

import { PostCard, Loading } from '../components'
import config from '../config'
import { loadavg } from 'os';

const { duration, transitions } = config
const { show, hide } = transitions.home

const Container = styled.div`
  position: relative;
  min-height: 784px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    margin-bottom: 60px;
  }
`

const PostList = styled.div`
  display: ${props => props.init ? 'none' : 'flex'};
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  animation-duration: ${duration / 1000}s;
  animation-fill-mode: forwards;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  outline: 0;
  position: absolute;
  margin: 0;
  width: 1.5rem;
  background: transparent;
  i {
    color: rgba(255, 255, 255, .6);
    font-size: 1.2rem;
  }
  @media (max-width: 1200px) {
    display: none;
  }
`

const PreBtn = Button.extend`
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
`

const NextBtn = Button.extend`
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
`

const MobileBtn = Button.extend`
  position: absolute;
  display: none;
  bottom: 0;
  transform: translate(0, 100%);
  i {
    font-size: .8rem;
  }
  @media (max-width: 1200px) {
    display: inline-block;
  }
`

const QAQ = styled.div`
  position: absolute;
  width: 100%;
`

class Home extends PureComponent {
  componentWillMount() {
    this.initFlag = true
  }

  componentDidMount() {
    // 获取文章总数
    this.props.dispatch({
      type: 'home/queryTotal',
    })

    // 动画监听
    this.performAndDisapper()
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'home/reset',
    })
  }

  // 监听动画结束，其他方法都太复杂了QAQ
  performAndDisapper = () => {
    if (!this.ACom) this.ACom = document.getElementById('ACom');
    this.ACom.addEventListener('animationend', this.animationEnd)
  }

  // 动画结束
  animationEnd = () => {
    const { loading } = this.props
    // 如果动画结束数据还未加载，那么隐藏
    if (loading) {
      this.props.dispatch({
        type: 'home/update',
        payload: {
          onHide: true,
        },
      })
    }
  }

  // 前一页
  prev = () => {
    this.performAndDisapper()
    this.props.dispatch({
      type: 'home/queryList',
      payload: {
        queryType: 'prev',
      },
    })
  }

  // 后一页
  next = () => {
    this.performAndDisapper()
    this.props.dispatch({
      type: 'home/queryList',
      payload: {
        queryType: 'next',
      },
    })
  }

  // hover 触发对话
  handleMouseOver = ({ type, title }) => {
    const prevTips = "要到上一页看看吗？(●'◡'●)"
    const nextTips = "要到下一页看看吗？(●'◡'●)"
    let tips = ''
    if (title) {
      tips = `要去看看<font color=#f6f> ${title} </font>吗？`
    } else {
      tips = type === 'prev' ? prevTips : nextTips
    }
    this.props.dispatch({
      type: 'appModel/showTips',
      payload: {
        tips,
      },
    })
  }

  renderCard = () => {
    const { postList, times } = this.props
    const cardList = postList.map((o, i) => {
      return (
        <PostCard
          key={o.id}
          {...o}
          time={times ? times[i] : 1}
          gotoCat={this.gotoCat}
          handleMouseOver={this.handleMouseOver}
        />
      )
    })
    return cardList
  }

  render() {
    const { loading, onHide } = this.props
    if (!loading && this.initFlag) this.initFlag = false
    return (
      <Container>
        <PreBtn
          onClick={this.prev}
          onMouseOver={() => this.handleMouseOver({ type: 'prev' })}
        >
          <i className="fa fa-angle-double-left" aria-hidden="true"></i>
        </PreBtn>

        <NextBtn
          onClick={this.next}
          onMouseOver={() => this.handleMouseOver({ type: 'next' })}
        >
          <i className="fa fa-angle-double-right" aria-hidden="true"></i>
        </NextBtn>

        <PostList
          id="ACom"
          className={loading ? hide : show}
          init={this.initFlag}
        >
          {this.renderCard()}
        </PostList>

        {loading && onHide && <QAQ><Loading /></QAQ>}
        <MobileBtn onClick={this.next}>
          <i className="fa fa-angle-double-down" aria-hidden="true"></i>
        </MobileBtn>
      </Container>
    )
  }
}

export default connect(({ loading, home }) => ({
  loading: loading.models.home,
  ...home,
}))(Home)
