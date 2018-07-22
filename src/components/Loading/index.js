/*
 *  卡哇伊的加载图
 * @author: 蝉時雨
 * @date: 2018-07-11
 */

import classNames from 'classnames/bind'

import config from '../../config'
import styles from './index.less'

const { loadingImg } = config
const cx = classNames.bind(styles)

const Loading = ({ className }) => {
   return (<img class={cx('loading', className)} src={loadingImg} alt="" />)
 }

 export default Loading