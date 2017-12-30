import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const Container = styled.div`
  width: 100%;
  color: #555;
  li {
    list-style-type: none;
  }
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  height: 60px;
  width: 450px;
  background: rgba(0, 0, 0, .1);
  li {
    padding: 2px 6px;
    margin: 0 6px;
    font-size: 16px;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
`

class Header extends PureComponent {
  render() {
    return (
      <Container>
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
            <li>
              <Link to='/friends'>
                <Icon name='heartbeat' /> 友链
              </Link>
            </li>
            <li>
              <Link to='/about'>
                <Icon name='envira' /> 关于
              </Link>
            </li>
          </StyledMenu>
        </Inner>
      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Header)
