import React, { Component } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { List, Label, Button, Icon } from 'semantic-ui-react'

const Container = styled.aside`
  padding: 50px 6px;
  width: 280px;
  height: 100px;
`

const Info = styled.div`
`

class Sidebar extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Container>
        <Info>
          <h2>蝉時雨</h2>
          <span>蝉鸣如雨，花宵道中</span>
          <List>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>ShangHai, China</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                <a href='mailto:1124590931@qq.com'>1124590931@qq.com</a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='linkify' />
              <List.Content>
                <a href='https://www.chanshiyu.com'>chanshiyu.com</a>
              </List.Content>
            </List.Item>
          </List>
        </Info>

        <Info>
          <h3>相册</h3>
        </Info>

        <Info>
          <h3>访客</h3>
        </Info>

        <Button as='div' labelPosition='right'>
          <Button color='red'>
            <Icon name='heart' /> Like
          </Button>
          <Label as='a' basic color='red' pointing='left'>2,048</Label>
        </Button>

      </Container>
    )
  }
}

export default connect(({ appModel }) => ({ ...appModel }))(Sidebar)
