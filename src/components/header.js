import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled from 'styled-components'
import { Sidebar, Menu } from 'semantic-ui-react'

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
`

const MenuBtn = styled.button`
  display: none !important;
  position: absolute;
  color: #444 !important;
  background: transparent !important;
  @media (max-width: 600px) {
    display: inline-block !important;
  }
`

const DropMenu = styled(Sidebar)`
  display: flex;
  flex-wrap: wrap;
  height: 300px !important;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.2) !important;
  a {
    display: inline-block;
    width: 25%;
    text-align: center;
  }
`

const MenuItem = styled.div`
  padding: 10px 0;
  color: #444;
  font-size: 16px;
`

const Title = styled.a`
  margin-bottom: 6px;
  font-family: GuDianMingChaoTi;
  font-size: 52px;
  line-height: 60px;
  letter-spacing: 2px;
`

const SubTitle = styled.span`
  font-family: GuDianMingChaoTi;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 4px;
`

const StyledMenu = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 14px;
  padding: 0 30px;
  height: 60px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset;
  li {
    width: 48px;
    font-size: 16px;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 60px;
  }
  @media (max-width: 600px) {
    display: none;
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
  _handleMouseOver = ({ type }) => {
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
        <Sidebar.Pushable>
          <DropMenu as={Menu} animation="push" direction="top" visible={dropMenu}>
            <Link to="/">
              <MenuItem name="home">
                <i className="fa fa-university" aria-hidden="true"></i> 首页
              </MenuItem>
            </Link>
            <Link to="/archives">
              <MenuItem name="archives">
                <i className="fa fa-archive" aria-hidden="true"></i> 归档
              </MenuItem>
            </Link>
            <Link to="/categories">
              <MenuItem name="categories">
                <i className="fa fa-bookmark" aria-hidden="true"></i>分类
              </MenuItem>
            </Link>
            <Link to="/tags">
              <MenuItem name="tags">
                <i className="fa fa-tags" aria-hidden="true"></i>标签
              </MenuItem>
            </Link>
            {shuoshuoOptions.showPage && (
              <Link to="/shuoshuo">
                <MenuItem name="shuoshuo">
                  <i className="fa fa-commenting" aria-hidden="true"></i>说说
                </MenuItem>
              </Link>
            )}
            {booksOptions.showPage && (
              <Link to="/books">
                <MenuItem name="books">
                  <i className="fa fa-book" aria-hidden="true"></i>书单
                </MenuItem>
              </Link>
            )}
            {friendsOptions.showPage && (
              <Link to="/friends">
                <MenuItem name="friends">
                  <i className="fa fa-heartbeat" aria-hidden="true"></i>友链
                </MenuItem>
              </Link>
            )}
            {aboutOptions.showPage && (
              <Link to="/about">
                <MenuItem name="about">
                  <i className="fa fa-envira" aria-hidden="true"></i>关于
                </MenuItem>
              </Link>
            )}
          </DropMenu>
          <Sidebar.Pusher>
            <MenuBtn
              style={{ marginTop: dropMenu ? '40px' : 0 }}
              onClick={this.toggleMenu}
            >
              <i className="fa fa-list-ul" aria-hidden="true"></i>
            </MenuBtn>
            <Inner>
              <Title href="/">蝉時雨</Title>
              <SubTitle>蝉鸣如雨 花宵道中</SubTitle>
              <StyledMenu>
                <li>
                  <Link to="/" onMouseOver={() => this._handleMouseOver({ type: 'home' })}>
                    <i className="fa fa-university" aria-hidden="true"></i> 首页
                  </Link>
                </li>
                <li>
                  <Link
                    to="/archives"
                    onMouseOver={() => this._handleMouseOver({ type: 'archives' })}
                  >
                    <i className="fa fa-archive" aria-hidden="true"></i> 归档
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    onMouseOver={() => this._handleMouseOver({ type: 'categories' })}
                  >
                    <i className="fa fa-bookmark" aria-hidden="true"></i> 分类
                  </Link>
                </li>
                <li>
                  <Link to="/tags" onMouseOver={() => this._handleMouseOver({ type: 'tags' })}>
                    <i className="fa fa-tags" aria-hidden="true"></i> 标签
                  </Link>
                </li>
                {shuoshuoOptions.showPage && (
                  <li>
                    <Link
                      to="/shuoshuo"
                      onMouseOver={() => this._handleMouseOver({ type: 'shuoshuo' })}
                    >
                      <i className="fa fa-commenting" aria-hidden="true"></i> 说说
                    </Link>
                  </li>
                )}
                {booksOptions.showPage && (
                  <li>
                    <Link to="/books" onMouseOver={() => this._handleMouseOver({ type: 'books' })}>
                      <i className="fa fa-book" aria-hidden="true"></i> 书单
                    </Link>
                  </li>
                )}
                {friendsOptions.showPage && (
                  <li>
                    <Link
                      to="/friends"
                      onMouseOver={() => this._handleMouseOver({ type: 'friends' })}
                    >
                      <i className="fa fa-heartbeat" aria-hidden="true"></i> 友链
                    </Link>
                  </li>
                )}
                {aboutOptions.showPage && (
                  <li>
                    <Link to="/about" onMouseOver={() => this._handleMouseOver({ type: 'about' })}>
                      <i className="fa fa-envira" aria-hidden="true"></i> 关于
                    </Link>
                  </li>
                )}
              </StyledMenu>
            </Inner>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Header)
