import Link from 'umi/link'
import classNames from 'classnames/bind'

import MarkeDown from '../MarkDown'
import styles from './index.less'

const cx = classNames.bind(styles)

const PostCard = ({ number, title, date, cover, desc, filterLabels, milestone, times }) => {
  return (
    <div class={cx('card')}>
      <Link to={`/post/${number}`} data-title={title}>
        <div class={cx('header')}>
          <img src={cover} alt="" />
          <h3>{title}</h3>
        </div>
        <MarkeDown className={cx('desc')} content={desc} />
        <div class={cx('meta')}>
          <span>
            <i className="fa fa-clock-o" aria-hidden="true" />
            <span>{date}</span>
          </span>
          <span>
            <i className="fa fa-eye" aria-hidden="true" />
            <span>热度{times}℃</span>
          </span>
          <span>
            <i className="fa fa-bookmark" aria-hidden="true" />
            <span>{milestone && milestone.title ? milestone.title : '未分类'}</span>
          </span>
          <span>
            <i className="fa fa-tags" aria-hidden="true" />
            <span>
              {filterLabels.slice(0, 2).map(o => (
                <span key={o.id}>{o.name}</span>
              ))}
            </span>
          </span>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
