import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import styled from 'styled-components'
import marked from 'marked'

const Container = styled.div`
  display: inline-block;
  margin: .06rem 0;
  width: 48.68%;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const StyledLink = styled(Link)`
  &:hover {
    color: #666;
  }
`

const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: .03rem;
  background: rgba(255, 255, 255, .6);
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier(.6, .2, .1, 1) 0s;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2), 0 6px 6px rgba(0, 0, 0, .24);
    transform: translateY(-6px);
    img {
      transform: scale(1.06);
    }
  }
`

const Header = styled.div`
  position: relative;
  overflow: hidden;
  img {
    display: block;
    // min-height: 246px;
    width: 100%;
    transition: transform 0.6s ease-out;
  }
`

const Title = styled.div`
  position: absolute;
  bottom: 0;
  padding: .12rem .16rem;
  width: 100%;
  letter-spacing: 1px;
  color: #eee;
  font-size: .18rem;
  font-weight: normal;
  background: rgba(0, 0, 0, .4);
`

const Content = styled.div`
  padding: .12rem .16rem;
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-height: 1.6;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const Meta = styled.div`
  padding: .12rem .16rem;
  border-top: 1px solid rgba(0, 0, 0, .06);
`

const Item = styled.span`
  margin-right: .06rem;
  color: #999;
  i {
    margin-right: .03rem;
  }
`

const Tag = styled.span`
  padding-right: .04rem;
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
  handleMouseOver,
}) => {
  const date = created_at.slice(0, 10)
  const desc = body.split('<!-- more -->')[0]
  const result = /http.+jpg/g.exec(desc)
  const cover = result[0]
  const content = desc.split('.jpg)')[1].trim()
  const filterLabels = labels.sort((a, b) => a.name.length >= b.name.length).slice(0, 2)

  return (
    <Container>
      <StyledLink
        to={`/post/${number}`}
        onMouseOver={() => handleMouseOver({ type: 'title', title })}
      >
        <Card raised fluid>
          <Header>
            <img alt="" src={cover} />
            <Title>{title}</Title>
          </Header>
          <Content dangerouslySetInnerHTML={{ __html: marked(content) }} />
          <Meta>
            <Item>
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              {date}
            </Item>
            <Item>
              <i className="fa fa-eye" aria-hidden="true"></i>
              热度{time}℃
            </Item>
            <Item>
              <i className="fa fa-bookmark" aria-hidden="true"></i>
              {milestone && milestone.title ? milestone.title : '未分类'}
            </Item>
            <Item>
              <i className="fa fa-tag" aria-hidden="true"></i>
              {filterLabels.map(o => {
                return <Tag key={o.id}>{o.name}</Tag>
              })}
            </Item>
          </Meta>
        </Card>
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
  handleMouseOver: PropTypes.func,
}

export default PostCard
