import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%;
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
  return (
    <Container>
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
            <p>Theme - <a href='/'>HeartBeat</a></p>
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
