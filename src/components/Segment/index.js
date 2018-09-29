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
      borderTop: `2px solid ${color || '#f6f'}`
    }}>
      <span class={cx('label')} style={{
        background: color || '#f6f',
      }}>
        <i style={{
          color: color || '#f6f',
        }} />
        {title}
      </span>
      {!!content && <MarkeDown className={cx('content')} content={content} />}
    </div>
  )
}

export default Segment
