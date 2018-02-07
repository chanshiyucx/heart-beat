import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

import { Archive, Quote, Pagination, Loading } from '../components'
import { shuffle } from '../utils'
import config from '../config'

const { duration, transitions, qoutes, themeColors } = config
const { show, hide } = transitions.page
const newColors = shuffle(themeColors)

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
  animation-fill-mode: forwards;
`

const ArchiveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 700px) {
    justify-content: space-around;
  }
`

class Archives extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'page/queryTotal',
    })

    // 动画监听
    this.performAndDisapper()
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        archivesOnHide: true,
        page: 0,
        totalList: [],
        archives: [],
      },
    })
  }

  // 监听动画结束，其他方法都太复杂了QAQ
  performAndDisapper = () => {
    if (!this.ACom) this.ACom = document.getElementById('ACom');
    this.ACom.addEventListener('animationend', this.animationEnd)
  }

  // 动画结束
  animationEnd = () => {
    const { loading } = this.props
    // 如果动画结束数据还未加载，那么隐藏
    if (loading) {
      this.props.dispatch({
        type: 'page/update',
        payload: {
          archivesOnHide: true,
        },
      })
    }
  }

  // 前一页
  prev = () => {
    this.performAndDisapper()
    this.props.dispatch({
      type: 'page/queryArchives',
      payload: {
        queryType: 'prev',
      },
    })
  }

  // 后一页
  next = () => {
    this.performAndDisapper()
    this.props.dispatch({
      type: 'page/queryArchives',
      payload: {
        queryType: 'next',
      },
    })
  }

  render() {
    const {
      loading,
      archivesOnHide,
      archives,
      totalList,
      page,
    } = this.props
    const maxPage = Math.ceil(totalList.length / 10)
    return (
      <Container>
        <Wapper
          id="ACom"
          className={loading ? hide : show}
          onHide={archivesOnHide}
        >
          <Quote text={qoutes.archives} />
          <ArchiveList>
            {
              archives.map((o, i) => {
                const color = newColors[i]
                return (
                  <Archive key={o.id} color={color} archive={o} />
                )
              })
            }
          </ArchiveList>
          <Pagination maxPage={maxPage} page={page} prev={this.prev} next={this.next} />
        </Wapper>
        {(!archives || archives.length === 0 || archivesOnHide) && <Loading />}
      </Container>
    )
  }
}

export default connect(({ loading, page }) => ({
  loading: loading.effects['page/queryTotal'] || loading.effects['page/queryArchives'],
  ...page,
}))(Archives)
