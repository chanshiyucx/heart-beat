import React, { PureComponent } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import styled from 'styled-components'
import { Menu, Input } from 'semantic-ui-react'

const Container = styled.div`
  padding-left: 280px;
  height: 60px;
`

const StyledMenu = styled(Menu)`
  height: 100%;
`

const StyledMenuItem = styled(Menu.Item)`
  width: 80px;
  justify-content: center;
`

const StyledInput = styled(Menu.Menu)`
  width: 239px;
`

class Nav extends PureComponent {
  handleItemClick = (e, { name }) => {
    this.props.dispatch({
      type: 'appModel/switchRoute',
      payload: {
        route: name,
      }
    })
  }

  render() {
    const { route } = this.props
    return (
      <Container>
        <StyledMenu>
          <StyledMenuItem as={Link} to='/' content='首页'  name='home' active={route === 'home'} onClick={this.handleItemClick} />
          <StyledMenuItem as={Link} to='/about' content='关于' name='about' active={route === 'about'} onClick={this.handleItemClick} />
          <StyledMenuItem as={Link} to='/project' content='作品' name='project' active={route === 'project'} onClick={this.handleItemClick} />
          <StyledMenuItem as={Link} to='/friends' content='友链' name='friends' active={route === 'friends'} onClick={this.handleItemClick} />
          <StyledInput position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </StyledInput>
        </StyledMenu>
      </Container>
    )
  }
}


export default connect(({ appModel }) => ({ ...appModel }))(Nav)
