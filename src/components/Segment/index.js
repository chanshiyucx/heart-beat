/*
 * 多彩文本框
 * @author: 蝉時雨
 * @date: 2018-07-16
 */

import classNames from 'classnames/bind'

import MarkeDown from '../MarkDown'
import styles from './index.less'

const cx = classNames.bind(styles)

const Segment = ({
  color,
  title,
  content,
}) => {
  return (
    <div class={cx('container')} style={{
      borderTop: `2px solid ${color || '#faf'}`
    }}>
      <span class={cx('label')} style={{
        background: color || '#faf',
      }}>
        <i style={{
          color: color || '#faf',
        }} />
        {title}
      </span>
      {!!content && <MarkeDown className={cx('content')} content={content} />}
    </div>
  )
}

export default Segment
