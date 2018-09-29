import Link from 'umi/link'
import classNames from 'classnames/bind'

import MarkeDown from '../MarkDown'
import LazyImage from '../LazyImage'
import styles from './index.less'

const cx = classNames.bind(styles)

const PostPV = ({
  number,
  title,
  date,
  cover,
  desc,
  filterLabels,
  milestone,
  times,
}) => {
  return (
    <div class={cx('container')}>
      <Link to={`/post/${number}`}>
        <LazyImage src={cover} width={240} height={135} alt="" />
        <div class={cx('content')}>
          <div class={cx('info')}>
            <h3>{title}</h3>
            <div class={cx('meta')}>
              <span>
                <i className="fa fa-clock-o" aria-hidden="true"></i>
                <span>{date}</span>
              </span>
              <span>
                <i className="fa fa-eye" aria-hidden="true"></i>
                <span>热度{times}℃</span>
              </span>
              <span>
                <i className="fa fa-bookmark" aria-hidden="true"></i>
                <span>{milestone && milestone.title ? milestone.title : '未分类'}</span>
              </span>
              <span>
                <i className="fa fa-tags" aria-hidden="true"></i>
                <span>
                  {filterLabels.map(o => (<span key={o.id}>{o.name}</span>))}
                </span>
              </span>
            </div>
          </div>
          <MarkeDown className={cx('desc')} content={desc} />
        </div>
      </Link>
    </div>
  )
}

export default PostPV