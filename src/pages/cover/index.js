import _ from 'lodash'
import classNames from 'classnames/bind'
import config from '../../config'
import styles from './index.less'

const { covers } = config
const cx = classNames.bind(styles)

const Cover = () => {
  return (
    <div class={cx('container')}>
      <ul>
        {covers.map((o, i) => {
          return (
            <li>
              <img key={i} alt="" src={o} />
              <span>{i + 1}</span>
            </li>
          )
        })}
        {/* 添加四个空项目 */}
        {_.range(4).map((o, i) => {
          return <li class="empty" style="height: 0; margin: 0;" />
        })}
      </ul>
    </div>
  )
}

export default Cover
