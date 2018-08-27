/** 
 * @Author: chenxin 
 * @Date: 2018-07-08 10:32:18 
 * @Last Modified by: chenxin 
 * @Last Modified time: 2018-08-27 10:32:18 
 * Description: 文章内容
 */ 

import React, { PureComponent } from 'react'
import classNames from 'classnames/bind'

import MarkeDown from '../MarkDown'
import styles from './index.less'

const cx = classNames.bind(styles)

class PostBody extends PureComponent {
  render({
    title,
    date,
    cover,
    content,
    filterLabels,
    milestone,
    time,
    times,
  }) {
    return (
      <div class={cx('container')}>
        <div class={cx('header')}>
          <img alt="" src={cover} />
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
                  {filterLabels && filterLabels.map(o => (<span key={o.id}>{o.name}</span>))}
                </span>
              </span>
            </div>
          </div>
        </div>
        {!!content && <MarkeDown className={cx('content')} content={content} />}
      </div>
    )
  }
}

export default PostBody