import classNames from 'classnames/bind'
import styles from './index.less'

const cx = classNames.bind(styles)

const Quote = ({ text }) => {
  return (
    <div class={cx('quote')}>
      <i class="icon">&#xf10d;</i>
      <span>{text}</span>
      <i class="icon">&#xf10e;</i>
    </div>
  )
}

export default Quote
