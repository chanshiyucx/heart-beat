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
              <i class="icon">&#xe808;</i>
              {date}
            </span>
            <span>
              <i class="icon">&#xe802;</i>
              {milestone && milestone.title ? milestone.title : '未分类'}
            </span>
            <span>
              <i class="icon">&#xe807;</i>
              {labels.slice(0, 2).map(o => {
                return (
                  <span class={cx('tag')} key={o.id}>
                    {o.name}
                  </span>
                )
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Archive
