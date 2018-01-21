import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

import { Archive, Quote, Pagination, Loading } from '../components'
import { shuffle } from '../utils'
import { colors } from '../theme'
import config from '../config'

const { duration, transitions, qoutes } = config
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

    this.archives = window.$('#archives')
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        archivesOnHide: true,
        loading: true,
        total: 0,
        page: 0,
        archives: [],
      },
    })
  }

  // 前一页
  prev = () => {
    this.archives.animateCss(hide, this.onHide)
    this.props.dispatch({
      type: 'page/queryArchives',
      payload: {
        queryType: 'prev',
      },
    })
  }

  // 后一页
  next = () => {
    this.archives.animateCss(hide, this.onHide)
    this.props.dispatch({
      type: 'page/queryArchives',
      payload: {
        queryType: 'next',
      },
    })
  }

  onHide = () => {
    const { loading } = this.props
    if (loading) {
      this.props.dispatch({
        type: 'page/update',
        payload: {
          archivesOnHide: true,
        },
      })
    }
  }

  render() {
    const { archivesOnHide, loading, archives, total, page, pageSize } = this.props
    const maxPage = Math.ceil(total / pageSize)
    return (
      <Container>
        <Wapper
          id="archives"
          className={!loading ? show : hide}
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
          <Pagination mexPage={maxPage} page={page} prev={this.prev} next={this.next} />
        </Wapper>
        {(!archives || archives.length === 0 || archivesOnHide) && <Loading />}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(Archives)
