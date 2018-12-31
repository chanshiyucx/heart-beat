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
            <i class="icon">&#xe808;</i>
            <span>{date}</span>
          </span>
          <span>
            <i class="icon">&#xf525;</i>
            <span>热度{times}℃</span>
          </span>
          <span>
            <i class="icon">&#xe802;</i>
            <span>{milestone && milestone.title ? milestone.title : '未分类'}</span>
          </span>
          <span>
            <i class="icon">&#xe807;</i>
            <span>
              {filterLabels.slice(0, 2).map(o => (
                <span class={cx('tag')} key={o.id}>
                  {o.name}
                </span>
              ))}
            </span>
          </span>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
