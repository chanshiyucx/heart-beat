import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Menu, Label, Icon } from 'semantic-ui-react'

const Container = styled.div`
  width: 240px;
  height: 1000px;
`
const Section = styled.div`
  margin-top: 20px;
`

const StyledMenu = styled(Menu)`
  width: 240px!important;
`

const StyledLabel = styled(Label)`
  margin: 0 6px 6px 0!important;
`

class RightBar extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'sidebar/queryCatsAndTags'
    })
  }

  render() {
    const { cats, tags } = this.props
    return (
      <Container>
        <Section>
          <h3><Icon name='comments' />评论</h3>
        </Section>

        <Section>
          <h3><Icon name='bookmark' />分类</h3>
          <StyledMenu vertical>
            {
              cats.map((o) => {
                return (
                  <Menu.Item name={o.title} key={o.id}>
                    <Label color='teal'>{o.open_issues}</Label>
                    {o.title}
                  </Menu.Item>
                )
              })
            }
          </StyledMenu>
        </Section>

        <Section>
          <h3><Icon name='tag' />标签云</h3>
          {
            tags.map((o) => {
              return <StyledLabel size='tiny' key={o.id}>{o.name}</StyledLabel>
            })
          }
        </Section>

      </Container>
    )
  }
}

export default connect(({ sidebar }) => ({ ...sidebar }))(RightBar)
