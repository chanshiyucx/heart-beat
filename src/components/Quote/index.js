import classNames from 'classnames/bind'
import styles from './index.less'

const cx = classNames.bind(styles)

const Quote = ({ text }) => {
  return (
    <div class={cx('quote')}>
      <i class="fa fa-quote-left" aria-hidden="true" />
      <span>{text}</span>
      <i class="fa fa-quote-right" aria-hidden="true" />
    </div>
  )
}

export default Quote
