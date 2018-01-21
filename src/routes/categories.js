import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

import { Archive, Quote, Loading } from '../components'
import { shuffle } from '../utils'
import { colors } from '../theme'
import config from '../config'

const { catsInfo, duration, transitions, qoutes } = config
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
  transition: all 0.25s ease 0s, transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s,
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

const ArchiveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 700px) {
    justify-content: space-around;
  }
`

const Title = styled.div`
  h2 {
    display: inline-block;
    margin-right: .12rem;
    font-size: .2rem;
    font-weight: 700;
  }
`

const Button = styled.button`
  margin: 0 .04rem .1rem;
  padding: .08rem .12rem;
  font-size: .14rem;
  text-align: center;
  text-decoration: none;
  outline: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  border: none;
  border-radius: .03rem;
  background: rgba(0, 0, 0, .12);
  color: ${props => props.color || '#666'};
  i {
    color: #f6f;
    margin-left: .06rem;
  }
  &:hover {
    background: rgba(0, 0, 0, .2);
  }
`

class Categories extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'page/queryCats',
    })
    this.categories = window.$('#categories')
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'page/reset',
      payload: {
        cats: [],
        catsOnHide: true,
        filterTitle: '',
        filterPost: [],
      },
    })
  }

  filterPost = cat => {
    this.categories.animateCss(hide, this.onHide)
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
    // this.categories.animateCss(hide)
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
    const { filterPost } = this.props
    if (!filterPost.length) {
      this.props.dispatch({
        type: 'page/update',
        payload: {
          catsOnHide: true,
        },
      })
    }
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
        <Wapper
          id="categories"
          className={catsOnHide ? hide : show}
          onHide={catsOnHide}
        >
          {!!filterPost.length
            ? <div>
                <Title>
                  <h2>Category:{' '}</h2>
                  <Button onClick={this.clearFilter}>
                    {filterTitle}
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </Button>
                </Title>
                <ArchiveList>
                  {
                    filterPost.map((o, i) => {
                      const color = newColors[i]
                      return (
                        <Archive key={o.id} color={color} archive={o} />
                      )
                    })
                  }
                </ArchiveList>
               </div>
            : <div>
                <Quote text={qoutes.categories} />
                <CatList>{this.renderCats(cats)}</CatList>
              </div>
          }
        </Wapper>
        { catsOnHide && <Loading />}
      </Container>
    )
  }
}

export default connect(({ page }) => ({ ...page }))(Categories)
