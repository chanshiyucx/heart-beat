/** 
 * @Author: chenxin 
 * @Date: 2018-07-16 10:31:34 
 * @Last Modified by: chenxin 
 * @Last Modified time: 2018-08-27 10:31:34 
 * Description: 页面一言
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