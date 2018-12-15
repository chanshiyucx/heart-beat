import React, { PureComponent } from 'react'
import marked from 'marked'

import Prism from '../../assets/prism/prism.js'

const renderer = new marked.Renderer()
renderer.heading = function(text, level) {
  const icon = ['gift', 'envira', 'hashtag'][level - 2]
  return `<h${level} id="${text}"><i class="fa fa-${icon}" aria-hidden="true"></i>${text}</h${level}>`
}

renderer.link = function(href, title, text) {
  // 只显示一个图标
  if (text.includes('aria-hidden="true"')) {
    return `<a href="${href}" target="_blank">${text}</a>`
  }
  return `<a href="${href}" target="_blank"><i class="fa fa-link" aria-hidden="true"></i>${text}</a>`
}

renderer.image = function(href, title, text) {
  let clazz = `img-box ${href.endsWith('#full') ? 'full-box' : ''}`
  //判断是否全宽渲染
  return `<span class="${clazz}"><a href="${href}" data-caption="${text}">
    <img src="${href}" alt="${text}" /></a>${text ? `<span>◭ ${text}</span>` : ''}</span>`
}

marked.setOptions({
  renderer,
  highlight: (code, lang) => {
    return Prism.highlight(code, Prism.languages[lang || 'markup'], lang)
  }
})

class MarkeDown extends PureComponent {
  componentDidMount() {
    Prism.highlightAll()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      Prism.highlightAll()
    }
  }

  render({ className, content }) {
    return (
      <div class={className} dangerouslySetInnerHTML={{ __html: marked(content, { renderer }) }} />
    )
  }
}

export default MarkeDown
