import React, { PureComponent } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Gitalk from 'gitalk'
import classNames from 'classnames/bind'

import { Transition, Quote, Segment, Loading } from '../../components'
import config from '../../config'
import styles from './index.less'

const { gitalkOption, aboutOption, themeColors } = config
const { enableGitalk, qoute, avatar, info, contact, project } = aboutOption
const cx = classNames.bind(styles)
const colors = _.shuffle(themeColors)

class About extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: true,
      renderGitalk: false
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'app/queryPage',
      payload: { type: 'about' }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !_.isEmpty(nextProps.about)) {
      this.setState({ showLoading: false })
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'app/updateState',
      payload: { about: {} }
    })
  }

  // 渲染评论
  renderGitalk = () => {
    if (enableGitalk) {
      setTimeout(() => {
        const gitalk = new Gitalk({
          ...gitalkOption,
          title: '关于'
        })
        gitalk.render('gitalk')
      }, 100)
      this.setState({ renderGitalk: true })
    }
  }

  render({ about, loading }, { showLoading }) {
    const section =
      about.body &&
      about.body
        .trim()
        .split('## ')
        .filter(o => o.length)
        .map(o => {
          const title = o.match(/.+?\r\n/)[0]
          return {
            title,
            content: o.slice(title.length)
          }
        })

    return (
      <div class={cx('container')}>
        <Transition
          visible={!loading && !showLoading}
          animation="drop"
          duration={600}
          onShow={this.renderGitalk}
        >
          <div class={cx('body')}>
            <Quote text={qoute} />
            <div>
              <div class={cx('header')}>
                <img src={avatar} alt="" />
                <div class={cx('info')}>
                  {info.length &&
                    info.map((o, i) => {
                      return (
                        <span key={i}>
                          <i className={`fa fa-${o.icon}`} aria-hidden="true" /> {o.text}
                        </span>
                      )
                    })}
                </div>
              </div>
              <div class={cx('concat')}>
                {contact.map((o, i) => {
                  return (
                    <a key={i} href={o.link} rel="noopener noreferrer" target="_blank">
                      <img class="icon" alt="" src={o.icon} />
                    </a>
                  )
                })}
              </div>
              <div class={cx('project')}>
                {project.map((o, i) => {
                  return (
                    <a key={i} href={o.link} rel="noopener noreferrer" target="_blank">
                      <img class={cx('cover')} alt="" src={o.cover} />
                      <div class={cx('info')}>
                        <span>{o.name}</span>
                      </div>
                    </a>
                  )
                })}
                {/* 添加四个空项目 */}
                {/* {_.range(4).map((o, i) => {
                  return (
                    <a
                      class="empty"
                      style="height: 0; margin: 0;"
                      key={i + 'empty'}
                      href={o.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  )
                })} */}
              </div>
              <div class={cx('content')}>
                {section &&
                  section.map((o, i) => {
                    const color = colors[i]
                    return <Segment key={i} color={color} title={o.title} content={o.content} />
                  })}
              </div>
            </div>
          </div>
        </Transition>

        {enableGitalk && <div id="gitalk" />}
        {showLoading && <Loading className={cx('loading')} />}
      </div>
    )
  }
}

export default connect(({ app, loading }) => ({
  about: app.about,
  loading: loading.effects['app/queryPage']
}))(About)
