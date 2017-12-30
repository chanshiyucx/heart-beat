import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import styled from 'styled-components'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Home from 'material-ui/svg-icons/action/home'
import Avatar from 'material-ui/Avatar'
import Dashboard from 'material-ui/svg-icons/action/dashboard'
import LinkIcon from 'material-ui/svg-icons/content/link'
import Loyalty from 'material-ui/svg-icons/action/loyalty'
import Devices from 'material-ui/svg-icons/action/important-devices'
import FontIcon from 'material-ui/FontIcon'
import config from '../config'

const { friends, contact } = config

const StyledDivider = styled(Divider)`
  background-color: #ccc!important;
`

const StyledListItem = styled(ListItem)`
  & > div {
    font-family: 'Monda';
    color: #666!important;
  }
`

const NestedListItem = StyledListItem.extend`
  & > div {
    background: rgba(0, 0, 0, .1)!important;
  }
`

const TagListItem = styled(ListItem)`
  & > div {
    background: rgba(0, 0, 0, .1)!important;
    font-family: 'Monda', 'PT Mono';
  }
`

const CatNum = styled.div`
  display: flex!important;
  justify-content: center;
  align-items: center;
  padding: 2px 6px;
  background: #666;
  border-radius: 3px;
  color: #eee;
`

const Menu= ({
  cats,
  tags,
  filterList,
}) => {
  const CatList = cats.map((o) => {
    return (
      <NestedListItem
        key={o.id}
        containerElement={<Link to={`/categories/${o.title}`} />}
        onClick={() => filterList({ type: 'milestone', filter: o.number })}
        primaryText={o.title}
        rightIcon={
          <CatNum>
            { o.open_issues || 0 }
          </CatNum>
        }
      />
    )
  })

  const TagList = tags.map((o) => {
    return (
      <TagListItem
        key={o.id}
        containerElement={<Link to={`/tags/${o.name}`} />}
        onClick={() => filterList({ type: 'labels', filter: o.name })}
        primaryText={o.name}
        style={{color: `#${o.color}`, fontFamily: 'Monda'}}
      />
    )
  })

  const FriendList = friends.map((o, i) => {
    return (
      <NestedListItem
        key={i}
        primaryText={o.name}
        leftAvatar={<Avatar src={o.avatar} />}
        onClick={() => window.open(o.link,'_blank')}
      />
    )
  })

  const ContactList = contact.map((o, i) =>{
    return (
      <NestedListItem
        key={i}
        primaryText={o.name}
        leftIcon={<FontIcon className={`fa fa-${o.icon}`} style={o.icon === 'envelope' ? {fontSize: 20} : null}/>}
        onClick={() => window.open(o.link,'_blank')}
      />
    )
  })

  return (
    <div>
      <List>
        <Link to={'/'}>
          <StyledListItem primaryText="首页" leftIcon={<Home />} />
        </Link>
        <StyledListItem primaryText="分类" leftIcon={<Dashboard />} nestedItems={CatList} primaryTogglesNestedList={true} />
        <StyledListItem primaryText="标签" leftIcon={<Loyalty />} nestedItems={TagList} primaryTogglesNestedList={true} />
      </List>
      <StyledDivider />
      <List>
        <StyledListItem primaryText="友情链接" leftIcon={<LinkIcon />} nestedItems={FriendList} primaryTogglesNestedList={true} />
        <StyledListItem primaryText="联系方式" leftIcon={<Devices />} nestedItems={ContactList} primaryTogglesNestedList={true} />
      </List>
      <div id="cplayer"></div>
    </div>
  )
}

Menu.propTypes = {
  cats: PropTypes.array,
  tags: PropTypes.array,
  filterList: PropTypes.func,
}

export default Menu
