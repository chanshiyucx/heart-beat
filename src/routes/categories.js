import React, { PureComponent } from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import { Transition, Button, Icon } from 'semantic-ui-react'
import ArchiveList from '../components/archiveList'
import Quote from '../components/quote'
import Loading from '../components/loading'

const Container = styled.div`
  padding: 10px 16px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  background: rgba(255, 255, 255, .6);
`

const CatList = styled.div`
  padding: 16px 1%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const Cat = styled.div`
  margin-bottom: 16px;
  width: 30%;
  height: 160px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.16);
`

const CatHeader = styled.div`
  position: relative;
  width:100%;
  height: 46%;
  background: #fcf;
`

const CatContent = styled.div`
  background: #ddd;
  height: 60%;
`

const StyledImg = styled.img`
  position: absolute;
  left: 20px;
  bottom: -40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,.16);
`

const StyledTitle = styled.span`
  position: absolute;
  right: 20px;
  bottom: -20px;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border-radius: 3px;
  background: #eee;
  box-shadow: 0 3px 6px rgba(0,0,0,.16);
`

const StyledButton = styled(Button)`
  margin: 10px;
  padding: 8px 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, .1)!important;
  color: ${props => '#' + props.bg + '!important' || '#666' };
  &:hover {
    background: rgba(0, 0, 0, .2)!important;
  }
`

const Filter = styled.div`

`

const FilterHeader = styled.h2`
  margin: 16px 0 12px;
`

class Categories extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'site/queryCats',
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'site/reset',
      payload: {
        cats: [],
        catsOnHide: false,
        filterTitle: '',
        filterPost: [],
      }
    })
  }

  filterPost = (cat) => {
    console.log('cat', cat)
    this.props.dispatch({
      type: 'site/filterPost',
      payload: {
        type: 'milestone',
        filter: cat.number,
        filterTitle: cat.title,
      }
    })
  }

  clearFilter = () => {
    this.props.dispatch({
      type: 'site/update',
      payload: {
        catsOnHide: false,
        filterTitle: '',
        filterPost: [],
      }
    })
  }

  onHide = () => {
    this.props.dispatch({
      type: 'site/update',
      payload: {
        catsOnHide: true,
      }
    })
  }

  renderCats = (cats) => {
    if (cats && cats.length > 0) {
      const catList = cats.map((o) => {
        return (
          <Cat key={o.id} onClick={() => {this.filterPost(o)}}>
            <CatHeader>
              <StyledImg alt='' src='https://dn-coding-net-production-pp.qbox.me/0619cfc2-67e5-4c35-8562-692d323f2525.jpg' />
              <StyledTitle>{o.title} ({o.open_issues})</StyledTitle>
            </CatHeader>
            <CatContent>

            </CatContent>
          </Cat>
        )
      })
      return catList
    }
  }

  render() {
    const { cats, catsOnHide, filterTitle, filterPost } = this.props
    const text = '行云流水，妙笔生花'
    return (
      <Container>
        <Transition visible={cats.length > 0 && !filterTitle} animation='scale' duration={800} onHide={this.onHide}>
          <div>
            <Quote text={text} />
            <CatList>
              {this.renderCats(cats)}
            </CatList>
          </div>
        </Transition>
        <Transition visible={filterTitle && catsOnHide} animation='scale' duration={800}>
          <div>
            <Filter>
              <FilterHeader>
                Category: <StyledButton icon labelPosition='right' onClick={this.clearFilter}>
                       {filterTitle}
                       <Icon name='delete' color='red' />
                     </StyledButton>
              </FilterHeader>
              <ArchiveList archives={filterPost} />
            </Filter>
          </div>
        </Transition>
        {!cats || cats.length === 0 &&
          <Loading />
        }
      </Container>
    )
  }
}

export default connect(({ site }) => ({ ...site }))(Categories)
