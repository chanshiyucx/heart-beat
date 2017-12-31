import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import marked from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
})

// 修复中文id显示‘-’的bug
const renderer = new marked.Renderer()
renderer.heading = function(text, level) {
    return `<h${level} id="${text}">${text}</h${level}>`
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`

const Header = styled.div`
  position: relative;
  overflow: hidden;
  &:hover {
    img {
      transform: scale(1.06);
    }
  }
  img {
    display: block;
    width: 100%;
    transition: transform .6s ease-out;
  }
  @media (max-width: 900px) {
    h1 {
      font-size: 20px;
    }
  }
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  padding: 10px 16px;
  width: 100%;
  color: #eee;
  background: rgba(0, 0, 0, .44);
`

const Title = styled.h1`
  font-weight: normal;
  font-size: 24px;
  letter-spacing: 1px;
`

const Meta = styled.div`
  padding-top: 6px;
`

const StyledTag = styled.span`
  padding-right: 4px;
`

const Item = styled.span`
  margin-right: 10px;
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 16px;
  // user-select:text;
  font-size: 16px;
  font-family: monda;
  text-align: justify;
  p, h1, h2, h3, ul, ol {
    margin: 10px 16px 0;
  }
  h1 {
    font-size: 22px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  p, blockquote, ul, ol {
    line-height: 1.8;
    font-size: 16px;
  }
  img {
    width: calc(100% + 32px);
    margin-left: -16px;
    box-shadow: 0 0 10px #999;
  }
  code {
    padding: 2px 4px;
    font-size: 14px;
    color: #f6f;
    word-wrap: break-word;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .1);
  }
  pre, blockquote {
    padding: 10px 16px;
    background: rgba(0, 0, 0, .06);
    box-shadow: inset 0px 11px 8px -10px #999, inset 0px -11px 8px -10px #999;
    p {
      margin: 0;
    }
  }
  pre {
    line-height: 1.4;
    code {
      padding: 0;
      color: currentColor;
      background-color: transparent;
      .hljs-comment {
        text-shadow: none;
      }
    }
  }
  blockquote {
    margin: 10px 0;
    border-left: 4px solid #666;
  }
  a {
    border-bottom: 1px solid #999;
    &:hover {
      border-bottom-color: #faf;
    }
  }
  ol, ul {
    padding: 0 26px;
  }
  li {
    list-style: initial;
  }
  @media (max-width: 900px) {
    h1 {
      font-size: 20px;
    }
    h2 {
      font-size: 18px;
    }
    h3 {
      font-size: 16px;
    }
    pre, blockquote {
      overflow-x: scroll;
    }
  }
`

const PostBody = ({
  title,
  body,
  created_at,
  labels,
  milestone,
  time,
}) => {
  const reg=/http.+jpg/g
  const result = reg.exec(body)
  const cover = result[0]
  const content = body.split(`${cover})`)[1]
  const date = created_at.slice(0, 10)

  return (
    <Container>
      <Header>
        <img alt='' src={cover} />
        <Info>
          <Title>{title}</Title>
          <Meta>
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
                labels.map((o) => {
                  return (
                    <StyledTag key={o.id}>
                      {o.name}
                    </StyledTag>
                  )
                })
              }
            </Item>
          </Meta>
        </Info>
      </Header>
      <Content dangerouslySetInnerHTML={{ __html: marked(content, { renderer }) }} />
    </Container>
  )
}

PostBody.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  created_at: PropTypes.string,
  labels: PropTypes.array,
  milestone: PropTypes.object,
  time: PropTypes.number,
}

export default PostBody
