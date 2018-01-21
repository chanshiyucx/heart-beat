import React, { PureComponent } from 'react'
import styled from 'styled-components'
import marked from 'marked'
import hljs from 'highlight.js'
import Zooming from 'zooming'

const zooming = new Zooming({
  scaleBase: 0.8,
  bgOpacity: 0.6,
  scrollThreshold: 10,
})

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
})

// 修复中文id显示‘-’的bug
const renderer = new marked.Renderer()
renderer.heading = function(text, level) {
  return `<h${level} id="${text}"><i class="fa fa-${
    level === 2 ? 'gift' : 'envira'
  }" aria-hidden="true"></i> ${text}</h${level}>`
}

// 新开标签页打开
renderer.link = function(href, title, text) {
  return `<a href="${href}" target="_blank">${text}</a>`
}

// 图片预览
renderer.image = function(href, title, text) {
  return `<img class="zoomable" src="${href}" alt="${text}" data-action="zoom" />`
}

const Container = styled.div`
  border-radius: .03rem;
  overflow: hidden;
`

const Header = styled.div`
  position: relative;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    transition: transform 0.6s ease-out;
  }
  &:hover {
    img {
      transform: scale(1.06);
    }
  }
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  padding: .12rem .16rem;
  width: 100%;
  color: #eee;
  background: rgba(0, 0, 0, .4);
`

const Title = styled.h2`
  font-weight: normal;
  font-size: .24rem;
  letter-spacing: 1px;
`

const Meta = styled.div`
  padding-top: .06rem;
`

const Item = styled.span`
  margin-right: .1rem;
  i {
    margin-right: .03rem;
  }
`

const Tag = styled.span`
  padding-right: .06rem;
`

const Content = styled.div`
  margin: 0 auto;
  padding-bottom: .12rem;
  user-select: text;
  text-align: justify;
  p, ul, ol, blockquote {
    line-height: 1.7;
    font-size: .14rem;
  }
  p {
    margin: .12rem .16rem 0;
  }
  ol, ul {
    margin: .06rem .24rem;
  }
  h2, h3 {
    font-weight: normal;
  }
  h2 {
    margin: .12rem .16rem;
    padding: .08rem 0;
    font-size: .22rem;
    border-bottom: 1px dashed rgba(0, 0, 0, .2);
  }
  h3 {
    margin: .12rem .16rem -.08rem;
    font-size: .18rem;
    i {
      font-size: .15rem;
    }
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
  pre,
  blockquote {
    padding: 10px 16px;
    background: rgba(0, 0, 0, 0.06);
    box-shadow: inset 0px 11px 8px -10px #999, inset 0px -11px 8px -10px #999;
    p {
      margin: 0;
    }
  }
  pre {
    line-height: 1.6;
    code {
      padding: 0;
      color: currentColor;
      background-color: transparent;
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
  @media (max-width: 900px) {
    pre,
    blockquote {
      overflow-x: scroll;
    }
  }
`

class PostBody extends PureComponent {
  componentDidMount() {
    const osWidth = document.documentElement.clientWidth || document.body.scrollWidth
    if (osWidth > 600) zooming.listen('.zoomable')
  }

  render() {
    const { title, body, created_at, labels, milestone, time } = this.props
    const reg = /http.+jpg/g
    const result = reg.exec(body)
    const cover = result[0]
    const content = body.split(`${cover})`)[1]
    const date = created_at.slice(0, 10)
    return (
      <Container>
        <Header>
          <img alt="" src={cover} />
          <Info>
            <Title>{title}</Title>
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
                <i className="fa fa-tags" aria-hidden="true"></i>
                {labels.map(o => {
                  return <Tag key={o.id}>{o.name}</Tag>
                })}
              </Item>
            </Meta>
          </Info>
        </Header>
        <Content dangerouslySetInnerHTML={{ __html: marked(content, { renderer }) }} />
      </Container>
    )
  }
}

export default PostBody
