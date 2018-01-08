import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import styled from 'styled-components'
import { Card, Icon } from 'semantic-ui-react'
import marked from 'marked'

const Container = styled.div`
  display: inline-block;
  margin: 6px 0;
  width: 48.62%;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const StyledLink = styled(Link)`
  &:hover {
    color: #666;
  }
`

const StyledCard = styled(Card)`
  width: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, .6)!important;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.24)!important;
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s, opacity 0.5s cubic-bezier( 0.6, 0.2, 0.1, 1 ) 0s!important;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.24)!important;
    transform: translateY(-6px);
    img {
      transform: scale(1.06);
    }
  }
`

const StyledHeader = styled(Card.Content)`
  position: relative;
  padding: 0!important;
  overflow: hidden;
  img {
    width: 100%;
    transition: transform .6s ease-out;
  }
`

const StyledTitle = styled(Card.Header)`
  position: absolute;
  bottom: 0;
  padding: 10px 16px;
  width: 100%;
  letter-spacing: 1px;
  line-height: 1.6;
  color: #eee!important;
  font-family: Monda!important;
  font-size: 18px!important;
  font-weight: normal!important;
  background: rgba(0,0,0,.44)!important;
`

const StyledContent = styled(Card.Description)`
  padding: 10px 16px;
  height: 88px;
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 1.6;
    text-align: justify;
  }
`

const StyledTag = styled.span`
  padding-right: 4px;
`

const Item = styled.span`
  margin-right: 8px;
  color: #888;
`

const PostCard = ({
  number,
  title,
  body,
  user,
  created_at,
  labels,
  milestone,
  time,
}) => {
  const date = created_at.slice(0, 10)
  const desc = body.split('<!-- more -->')[0]
  const result = /http.+jpg/g.exec(desc)
  const cover = result[0]
  const content = desc.split('.jpg)')[1].trim()

  return (
    <Container>
      <StyledLink to={`/post/${number}`}>
        <StyledCard raised fluid >
          <StyledHeader>
            <img alt='' src={cover} />
            <StyledTitle>{title}</StyledTitle>
          </StyledHeader>
          <StyledContent dangerouslySetInnerHTML={{ __html: marked(content) }} />
          <Card.Content extra>
            <Item>
              <Icon name='time' />
              {date}
            </Item>
            <Item>
              <Icon name='eye' />
              热度{time}℃
            </Item>
            <Item>
              <Icon name='bookmark' />
              {milestone && milestone.title ? milestone.title : '未分类' }
            </Item>
            <Item>
              <Icon name='tags' />
              {
                labels.splice(0, 2).map((o) => {
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
      </StyledLink>
    </Container>
  )
}

PostCard.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.object,
  created_at: PropTypes.string,
  labels: PropTypes.array,
  milestone: PropTypes.object,
  time: PropTypes.number,
}

export default PostCard
