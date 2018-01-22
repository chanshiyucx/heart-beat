import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled from 'styled-components'

import config from '../config'
const { booksOptions, shuoshuoOptions, friendsOptions, aboutOptions } = config

const hoverTips = {
  home: '回首页看看吧 o(*￣▽￣*)ブ',
  archives: '主人又在发水文了 ( ˘•ω•˘ )',
  categories: '看看有什么感兴趣的话题吧 (▰˘◡˘▰)',
  tags: '偷偷看一下主人的特长吧ヽ(=^･ω･^=)丿',
  shuoshuo: '主人今天又忘记吃药了(｡ŏ_ŏ) ',
  books: '主人也相当好学呢 ⋉(● ∸ ●)⋊',
  friends: '主人的小伙伴都在这里哟 (๑ơ ₃ ơ)♥ ',
  about: '想了解更多关于主人的故事么✧*｡٩(ˊᗜˋ*)و✧*｡	',
}

const Container = styled.div`
  width: 100%;
  li {
    list-style: none;
  }
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;
  padding: 70px 0 60px;
  transition: all 0.6s cubic-bezier(.6, .2, .1, 1) 0s;
  @media (max-width: 600px) {
    padding: ${props => props.dropMenu ? '106px 0 24px' : '70px 0 60px'};
  }
`

const Title = styled.a`
  margin-bottom: .06rem;
  font-family: GuDianMingChaoTi;
  font-size: .52rem;
  line-height: .6rem;
  letter-spacing: .02rem;
`

const SubTitle = styled.span`
  font-family: GuDianMingChaoTi;
  font-size: .22rem;
  line-height: .26rem;
  letter-spacing: .04rem;
`

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: .14rem;
  padding: 0 .32rem;
  height: .6rem;
  background: rgba(0, 0, 0, .1);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2) inset;
  transition: all 0.6s cubic-bezier(.6, .2, .1, 1) 0s;
  li {
    width: .48rem;
    font-size: .16rem;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
  i {
    margin: .03rem
  }
  @media (max-width: 600px) {
    position: absolute;
    top: ${props => props.dropMenu ? '0' : '-1rem'};
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: .8rem;
    flex-wrap: wrap;
    li {
      width: 25%;
    }
    a {
      flex-direction: row;
      justify-content: center;
    }
  }
`

const MenuBtn = styled.button`
  display: none;
  position: fixed;
  top: ${props => props.dropMenu ? '.80rem' : '0'};
  padding: .1rem;
  color: #666;
  font-size: .26rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  outline: 0;
  border: none;
  background: transparent;
  z-index: 100;
  transition: all 0.6s cubic-bezier(.6, .2, .1, 1) 0s;
  @media (max-width: 600px) {
    display: block;
  }
`

class Header extends PureComponent {
  // 移动端展开菜单
  toggleMenu = () => {
    const { dropMenu } = this.props
    this.props.dispatch({
      type: 'appModel/update',
      payload: {
        dropMenu: !dropMenu,
      },
    })
  }

  // hover 触发对话
  handleMouseOver = ({ type }) => {
    const tips = hoverTips[type]
    this.props.dispatch({
      type: 'appModel/showTips',
      payload: {
        tips,
      },
    })
  }

  render() {
    const { dropMenu } = this.props
    return (
      <Container id="header">
        <MenuBtn dropMenu={dropMenu} onClick={this.toggleMenu}>
          <i className="fa fa-list-ul" aria-hidden="true"></i>
        </MenuBtn>
        <Inner dropMenu={dropMenu}>
          <Title href="/">蝉時雨</Title>
          <SubTitle>蝉鸣如雨 花宵道中</SubTitle>
          <Menu dropMenu={dropMenu}>
            <li>
              <Link to="/" onMouseOver={() => this.handleMouseOver({ type: 'home' })}>
                <i className="fa fa-university" aria-hidden="true"></i>
                <span>首页</span>
              </Link>
            </li>
            <li>
              <Link
                to="/archives"
                onMouseOver={() => this.handleMouseOver({ type: 'archives' })}
              >
                <i className="fa fa-archive" aria-hidden="true"></i>
                <span>归档</span>
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                onMouseOver={() => this.handleMouseOver({ type: 'categories' })}
              >
                <i className="fa fa-bookmark" aria-hidden="true"></i>
                <span>分类</span>
              </Link>
            </li>
            <li>
              <Link to="/tags" onMouseOver={() => this.handleMouseOver({ type: 'tags' })}>
                <i className="fa fa-tags" aria-hidden="true"></i>
                <span>标签</span>
              </Link>
            </li>
            {shuoshuoOptions.showPage && (
              <li>
                <Link
                  to="/shuoshuo"
                  onMouseOver={() => this.handleMouseOver({ type: 'shuoshuo' })}
                >
                  <i className="fa fa-commenting" aria-hidden="true"></i>
                  <span>说说</span>
                </Link>
              </li>
            )}
            {booksOptions.showPage && (
              <li>
                <Link to="/books" onMouseOver={() => this.handleMouseOver({ type: 'books' })}>
                  <i className="fa fa-book" aria-hidden="true"></i>
                  <span>书单</span>
                </Link>
              </li>
            )}
            {friendsOptions.showPage && (
              <li>
                <Link
                  to="/friends"
                  onMouseOver={() => this.handleMouseOver({ type: 'friends' })}
                >
                  <i className="fa fa-heartbeat" aria-hidden="true"></i>
                  <span>友链</span>
                </Link>
              </li>
            )}
            {aboutOptions.showPage && (
              <li>
                <Link to="/about" onMouseOver={() => this.handleMouseOver({ type: 'about' })}>
                  <i className="fa fa-envira" aria-hidden="true"></i>
                  <span>关于</span>
                </Link>
              </li>
            )}
          </Menu>
        </Inner>
      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Header)
