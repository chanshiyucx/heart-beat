import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

import config from '../config'
const { booksOptions, shuoshuoOptions, friendsOptions, aboutOptions } = config

const Container = styled.div`
  width: 100%;
  li {
    list-style-type: none;
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
  background: rgba(0, 0, 0, .1);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2) inset;
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
`

class Header extends PureComponent {
  render() {
    return (
      <Container id='header'>
        <Inner>
          <Title href='/'>蝉時雨</Title>
          <SubTitle>蝉鸣如雨 花宵道中</SubTitle>
          <StyledMenu>
            <li>
              <Link to='/'>
                <Icon name='university' /> 首页
              </Link>
            </li>
            <li>
              <Link to='/archives'>
                <Icon name='archive' /> 归档
              </Link>
            </li>
            <li>
              <Link to='/categories'>
                <Icon name='bookmark' /> 分类
              </Link>
            </li>
            <li>
              <Link to='/tags'>
                <Icon name='tags' /> 标签
              </Link>
            </li>
            {shuoshuoOptions.showPage &&
              <li>
                <Link to='/shuoshuo'>
                  <Icon name='talk' /> 说说
                </Link>
              </li>
            }
            {booksOptions.showPage &&
              <li>
                <Link to='/books'>
                  <Icon name='book' /> 书单
                </Link>
              </li>
            }
            {friendsOptions.showPage &&
              <li>
                <Link to='/friends'>
                  <Icon name='heartbeat' /> 友链
                </Link>
              </li>
            }
            {aboutOptions.showPage &&
              <li>
                <Link to='/about'>
                  <Icon name='envira' /> 关于
                </Link>
              </li>
            }
          </StyledMenu>
        </Inner>
      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Header)
