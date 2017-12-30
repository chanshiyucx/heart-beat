import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import styled from 'styled-components'
import { Card, Icon } from 'semantic-ui-react'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

const Archive = styled.div`
  display: inline-block;
  margin: 6px 0;
  width: 49%;
`

const StyledCard = styled(Card)`
  width: 100%;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)!important;
  background: rgba(255, 255, 255, .6)!important;
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s, opacity 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s!important;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23)!important;
    transform: translateY(-4px);
  }
`

const StyledDescription = styled(Card.Description)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

const StyledTag = styled.span`
  padding-right: 4px;
`

const Item = styled.span`
  margin-right: 10px;
  color: #999;
`

const ArchiveList = ({
  archives,
}) => {

  const archiveList = archives.map((o) => {
    const { id, number, created_at, milestone, labels, title } = o
    const date = created_at.slice(0, 10)
    return (
      <Archive key={id}>
        <Link to={`/post/${number}`}>
          <StyledCard raised fluid >
            <Card.Content>
              <StyledDescription>{title}</StyledDescription>
            </Card.Content>
            <Card.Content extra>
              <Item>
                <Icon name='time' />
                {date}
              </Item>
              <Item>
                <Icon name='bookmark' />
                {milestone && milestone.title ? milestone.title : '未分类' }
              </Item>
              <Item>
                <Icon name='tags' />
                {
                  labels.map((o) => {
                    return (
                      <StyledTag key={o.id}>
                        {o.name}
                      </StyledTag>
                    )
                  })
                }
              </Item>
            </Card.Content>
          </StyledCard>
        </Link>
      </Archive>
    )
  })

  return (
    <Container>
      {archiveList}
    </Container>
  )
}

ArchiveList.propTypes = {
  archives: PropTypes.array,
}

export default ArchiveList
