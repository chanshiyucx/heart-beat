import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import styled from 'styled-components'
import marked from 'marked'

const Container = styled(Link)`
  width: 50%;
  position: relative;
  overflow: hidden;
  &:hover {
    color: #666;
  }
  img {
    display: block;
    width: 100%;
    max-height: 1.6rem;
    object-fit: cover;
    transition: transform 0.6s ease-out;
  }
  &:hover {
    .cover {
      transform: scale(1.06);
    }
    .content {
      transform: translateY(-1.6rem);
    }
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`

const Content = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(.6, .2, .1, 1) 0s;
`

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: .24rem .36rem;
  height: 100%;
  line-height: 1.7;
  color: #ddd;
  box-sizing: border-box;
  background: rgba(0, 0, 0, .4);
  h2 {
    margin: .06rem 0;
    font-size: .2rem;
    font-weight: normal;
    letter-spacing: .01rem;
  }
`

const Item = styled.span`
  display: inline-block;
  margin-right: .06rem;
  width: 40%;
  i {
    margin-right: .04rem;
  }
`

const Tag = styled.span`
  padding-right: .06rem;
`

const Desc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .24rem .36rem;
  height: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, .6);
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-height: 1.7;
    font-size: .15rem;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const Preview = ({ 
  number,
  title,
  body,
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
  const filterLabels = labels.sort((a, b) => a.name.length >= b.name.length)

  return (
    <Container to={`/post/${number}`}>
      <img className="cover" alt="" src={cover} />
      <Content className="content">
        <Info>
          <h2>{title}</h2>
          <div>
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
          </div>
        </Info>
        <Desc dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </Content>
    </Container>
  )
}

Preview.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.object,
  created_at: PropTypes.string,
  labels: PropTypes.array,
  milestone: PropTypes.object,
  time: PropTypes.number,
}

export default Preview
