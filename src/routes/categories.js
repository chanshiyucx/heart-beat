import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Button, Icon } from 'semantic-ui-react'

import ArchiveList from '../components/archiveList'
import Quote from '../components/quote'
import Loading from '../components/loading'

import config from '../config'
const { catsInfo, duration, transitions, qoutes } = config

const Container = styled.div`
  margin: 0 auto;
  @media (max-width: 900px) {
    width: 96%;
  }
`

const Wapper = styled.div`
  padding: 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.24);
  background: rgba(255, 255, 255, 0.6);
`

const CatList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const Cat = styled.div`
  position: relative;
  margin-bottom: 16px;
  width: 32%;
  height: 160px;
  overflow: hidden;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16);
  transition: all 0.25s ease 0s,
    transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s,
    opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s !important;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23) !important;
    transform: translateY(-4px);
    img {
      animation-play-state: paused;
      transform: rotateZ(360deg);
    }
  }
  @media (max-width: 900px) {
    width: 96%;
  }
`

const CatHeader = styled.div`
  position: relative;
  width: 100%;
  height: 46%;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
`

const StyledImg = styled.img`
  position: absolute;
  left: 20px;
  bottom: -40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transition: transform 1s ease-out;
`

const StyledTitle = styled.span`
  position: absolute;
  right: 20px;
  bottom: -20px;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`

const CatContent = styled.div`
  position: absolute;
  bottom: 0;
  padding: 10px 16px 12px;
`

const StyledButton = styled(Button)`
  margin: 0 4px 10px !important;
  padding: 8px 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.1) !important;
  color: ${props => '#' + props.bg + '!important' || '#666'};
  &:hover {
    background: rgba(0, 0, 0, 0.2) !important;
  }
`

class Categories extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'page/queryCats',
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        cats: [],
        catsOnHide: false,
        filterTitle: '',
        filterPost: [],
      },
    })
  }

  filterPost = cat => {
    this.props.dispatch({
      type: 'page/filterPost',
      payload: {
        type: 'milestone',
        filter: cat.number,
        filterTitle: cat.title,
      },
    })
  }

  clearFilter = () => {
    this.props.dispatch({
      type: 'page/update',
      payload: {
        catsOnHide: false,
        filterTitle: '',
        filterPost: [],
      },
    })
  }

  onHide = () => {
    this.props.dispatch({
      type: 'page/update',
      payload: {
        catsOnHide: true,
      },
    })
  }

  renderCats = cats => {
    if (cats && cats.length > 0) {
      const catList = cats.map(o => {
        const info = catsInfo.find(cat => cat.name === o.title)
        const catText = info.text
        const catImg = info.img
        return (
          <Cat
            key={o.id}
            onClick={() => {
              this.filterPost(o)
            }}
          >
            <CatHeader bg={catImg}>
              <StyledImg alt="" src={catImg} />
              <StyledTitle>
                {o.title} ({o.open_issues})
              </StyledTitle>
            </CatHeader>
            <CatContent>{catText}</CatContent>
          </Cat>
        )
      })
      return catList
    }
  }

  render() {
    const { cats, catsOnHide, filterTitle, filterPost } = this.props
    return (
      <Container>
        <Transition
          visible={cats.length > 0 && !filterTitle}
          animation={transitions.drop || 'drop'}
          duration={duration}
          onHide={this.onHide}
        >
          <Wapper>
            <Quote text={qoutes.categories} />
            <CatList>{this.renderCats(cats)}</CatList>
          </Wapper>
        </Transition>
        <Transition
          visible={catsOnHide && !!filterTitle}
          animation="drop"
          duration={duration}
        >
          <Wapper>
            <h2>
              Category:{' '}
              <StyledButton
                icon
                labelPosition="right"
                onClick={this.clearFilter}
              >
                {filterTitle}
                <Icon name="delete" color="red" />
              </StyledButton>
            </h2>
            <ArchiveList archives={filterPost} />
          </Wapper>
        </Transition>
        {!cats || (cats.length === 0 && <Loading />)}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(Categories)
