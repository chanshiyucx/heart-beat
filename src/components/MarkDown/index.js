/** 
 * @Author: chenxin 
 * @Date: 2018-07-04 10:32:32 
 * @Last Modified by: chenxin 
 * @Last Modified time: 2018-08-27 10:32:32 
 * Description: MarkeDown 渲染
 */ 

import React, { PureComponent } from 'react'
import marked from 'marked'
import Zooming from 'zooming'

import Prism from '../../assets/prism/prism.js'

const zooming = new Zooming({
  scaleBase: 0.8,
  bgOpacity: 0.6,
  scrollThreshold: 10,
})

const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  return `<h${level} id="${text}"><i class="fa fa-${
    level === 2 ? 'gift' : 'envira'
    }" aria-hidden="true"></i>${text}</h${level}>`
}

renderer.link = function (href, title, text) {
  // 只显示一个图标
  if (text.includes('aria-hidden="true"')) {
    return `<a href="${href}" target="_blank">${text}</a>`
  }
  return `<a href="${href}" target="_blank"><i class="fa fa-link" aria-hidden="true"></i>${text}</a>`
}

renderer.image = function (href, title, text) {
  return `<img class="zoomable" src="${href}" alt="${text}" data-action="zoom" />`
}

marked.setOptions({
  renderer,
  highlight: (code, lang) => {
    return Prism.highlight(code, Prism.languages[lang || 'markup'], lang)
  },
})

class MarkeDown extends PureComponent {
  componentDidMount() {
    const osWidth = document.documentElement.clientWidth || document.body.scrollWidth
    if (osWidth > 600) zooming.listen('.zoomable')
    Prism.highlightAll()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      Prism.highlightAll()
    }
  }

  render({ className, content }) {
    return (<div class={className} dangerouslySetInnerHTML={{ __html: marked(content, { renderer }) }} />)
  }
}

export default MarkeDown
