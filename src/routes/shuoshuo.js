import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition } from 'semantic-ui-react'
import Gitalk from 'gitalk'

import { Segment, Quote, Pagination, Loading } from '../components'
import { shuffle } from '../utils'
import { colors } from '../theme'
import config from '../config'

const { gitalkOptions, duration, transitions, qoutes, shuoshuoOptions } = config
const { enableGitalk } = shuoshuoOptions
const newColors = shuffle(colors)

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  padding: .16rem;
  border-radius: .03rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .24);
  background: rgba(255, 255, 255, .6);
`

class ShuoShuo extends PureComponent {
  componentDidMount() {
    // 获取说说总数
    this.props.dispatch({
      type: 'page/queryShuoShuoTotal',
    })

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
    this.props.dispatch({
      type: 'page/queryShuoShuo',
      payload: {
        queryType: 'prev',
      },
    })
  }

  // 后一页
  next = () => {
    this.props.dispatch({
      type: 'page/queryShuoShuo',
      payload: {
        queryType: 'next',
      },
    })
  }

  onHide = () => {
    this.props.dispatch({
      type: 'page/update',
      payload: {
        shuoshuoOnHide: true,
      },
    })
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
        <div>
          <Transition
            visible={!shuoshuoLoading}
            animation={transitions.page || 'drop'}
            duration={duration}
            onHide={this.onHide}
          >
            <Wapper>
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
          </Transition>
          {(!myShuoShuo || myShuoShuo.length === 0 || shuoshuoOnHide) && <Loading />}
        </div>
        {enableGitalk && <div id="gitalk" />}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(ShuoShuo)
