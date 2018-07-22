/*
 * 页面一言
 * @author: 蝉時雨
 * @date: 2018-07-16
 */

import classNames from 'classnames/bind'

import styles from './index.less'

const cx = classNames.bind(styles)

const Quote = ({ text }) => {
  return (
    <div class={cx('quote')}>
      <i class="fa fa-quote-left" aria-hidden="true"></i>
      <span>{text}</span>
      <i class="fa fa-quote-right" aria-hidden="true"></i>
    </div>
  )
}

export default Quote