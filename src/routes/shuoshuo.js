import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import Gitalk from 'gitalk'

import { Segment, Quote, Pagination, Loading } from '../components'
import { shuffle } from '../utils'
import { colors } from '../theme'
import config from '../config'

const { gitalkOptions, duration, transitions, qoutes, shuoshuoOptions } = config
const { enableGitalk } = shuoshuoOptions
const { show, hide } = transitions.page
const newColors = shuffle(colors)

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  display: ${props => props.onHide ? 'none' : 'block'};
  padding: .16rem;
  border-radius: .03rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  background: rgba(255, 255, 255, .6);
  animation-duration: ${duration / 1000}s;
`

class ShuoShuo extends PureComponent {
  componentDidMount() {
    // 获取说说总数
    this.props.dispatch({
      type: 'page/queryShuoShuoTotal',
    })

    this.shuoshuo = window.$('#shuoshuo')

    if (enableGitalk) {
      const gitalk = new Gitalk({
        ...gitalkOptions,
        title: '说说',
      })
      // 渲染评论
      gitalk.render('gitalk')
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        shuoshuoLoading: true,
        shuoshuoHasMore: true,
        shuoshuoTotal: 0,
        shuoshuoPage: 0,
        myShuoShuo: [],
      },
    })
  }

  // 前一页
  prev = () => {
    this.shuoshuo.animateCss(hide, this.onHide)
    this.props.dispatch({
      type: 'page/queryShuoShuo',
      payload: {
        queryType: 'prev',
      },
    })
  }

  // 后一页
  next = () => {
    this.shuoshuo.animateCss(hide, this.onHide)
    this.props.dispatch({
      type: 'page/queryShuoShuo',
      payload: {
        queryType: 'next',
      },
    })
  }

  onHide = () => {
    const { shuoshuoLoading } = this.props
    if (shuoshuoLoading) {
      this.props.dispatch({
        type: 'page/update',
        payload: {
          shuoshuoOnHide: true,
        },
      })
    }
  }

  render() {
    const {
      shuoshuoOnHide,
      shuoshuoLoading,
      myShuoShuo,
      shuoshuoTotal,
      shuoshuoPage,
      shuoshuoPageSize,
    } = this.props
    const maxPage = Math.ceil(shuoshuoTotal / shuoshuoPageSize)
    return (
      <Container>
        <Wapper
          id="shuoshuo"
          className={!shuoshuoLoading ? show : hide}
          onHide={shuoshuoOnHide}
        >
          <Quote text={qoutes.shuoshuo} />
          <div>
            {
              myShuoShuo.map((o, i) => {
                const date = o.created_at.slice(0, 10)
                const color = newColors[i]
                return (
                  <Segment key={o.id} color={color} title={date} content={o.body} />
                )
              })
            }
          </div>
          <Pagination mexPage={maxPage} page={shuoshuoPage} prev={this.prev} next={this.next} />
        </Wapper>
        {(!myShuoShuo || myShuoShuo.length === 0 || shuoshuoOnHide) && <Loading />}
        {enableGitalk && <div id="gitalk" />}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(ShuoShuo)
