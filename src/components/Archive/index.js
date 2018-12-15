import React from 'react'
import Link from 'umi/link'
import classNames from 'classnames/bind'

import styles from './index.less'

const cx = classNames.bind(styles)

const Archive = ({ number, created_at, milestone, labels, title, color }) => {
  const date = created_at.slice(0, 10)

  return (
    <div class={cx('archive')}>
      <Link to={`/post/${number}`}>
        <div class={cx('segment')} style={{ borderTopColor: color }}>
          <div class={cx('title')}>{title}</div>
          <div class={cx('meta')}>
            <span>
              <i className="fa fa-clock-o" aria-hidden="true" />
              {date}
            </span>
            <span>
              <i className="fa fa-bookmark" aria-hidden="true" />
              {milestone && milestone.title ? milestone.title : '未分类'}
            </span>
            <span>
              <i className="fa fa-tags" aria-hidden="true" />
              {labels.map(o => {
                return <span key={o.id}>{o.name}</span>
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Archive
