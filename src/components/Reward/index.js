import classNames from 'classnames/bind'
import config from '../../config'
import styles from './index.less'

const { reward } = config
const cx = classNames.bind(styles)

const Reward = () => {
  return (
    <div class={cx('reward')}>
      <span class={cx('reward-icon')}>赏</span>
      <div class={cx('reward-body')}>
        <ul>
          {reward.map((o, i) => {
            return (
              <li key={i}>
                <img alt="" src={o.qr} />
                <span>{o.type}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Reward

