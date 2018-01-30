import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  margin: .06rem 0;
  width: 49%;
  @media (max-width: 700px) {
    width: 96%;
  }
`

const Segment = styled.div`
  border-top: 2px solid ${props => props.color || '#faf'};
  border-radius: .03rem;
  background: rgba(255, 255, 255, .4);
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier(.6, .2, .1, 1) 0s;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2), 0 6px 6px rgba(0, 0, 0, .24);
    transform: translateY(-4px);
  }
`

const Title = styled.div`
  padding: .12rem .16rem;
  overflow: hidden;
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

const Archive = ({
  color,
  archive,
}) => {
  const { number, created_at, milestone, labels, title } = archive
  const date = created_at.slice(0, 10)
  return (
    <Container>
      <Link to={`/post/${number}`}>
        <Segment color={color}>
          <Title>{title}</Title>
          <Meta>
            <Item>
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              {date}
            </Item>
            <Item>
              <i className="fa fa-bookmark" aria-hidden="true"></i>
              {milestone && milestone.title ? milestone.title : '未分类'}
            </Item>
            <Item>
              <i className="fa fa-tags" aria-hidden="true"></i>
              {labels.map(o => {
                return <Tag key={o.id}>{o.name}</Tag>
              })}
            </Item>
          </Meta>
        </Segment>
      </Link>
    </Container>
  )
}

Archive.propTypes = {
  color: PropTypes.string,
  archive: PropTypes.any,
}

export default Archive
