import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import SmoothScroll from 'smooth-scroll'

const scroll = new SmoothScroll()

const Container = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%;
`

const ScrollToTop = styled(Button)`
  position: fixed;
  right: 10px;
  bottom: 50px;
  color: rgba(255, 255, 255, .6)!important;
  background: transparent!important;
  &:hover {
    color: rgba(0, 0, 0, .2)!important;
  }
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

const Footer = () => {
  const scrollToTop = () => {
    // 滚动到顶部
    const header = document.getElementById('header')
    scroll.animateScroll( header )
  }

  return (
    <Container>
      <ScrollToTop icon onClick={scrollToTop}>
        <Icon name='chevron circle up' size='huge' />
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

export default Footer
