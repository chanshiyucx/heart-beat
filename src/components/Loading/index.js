import classNames from 'classnames/bind'

import config from '../../config'
import styles from './index.less'

const { loadingImg } = config
const cx = classNames.bind(styles)

const Loading = ({ className }) => {
  return <img class={cx('loading', className)} src={loadingImg} alt="" />
}

export default Loading
