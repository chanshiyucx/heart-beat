/** 
 * @Author: chenxin 
 * @Date: 2018-07-11 10:32:46 
 * @Last Modified by: chenxin 
 * @Last Modified time: 2018-08-27 10:32:46 
 * Description: 卡哇伊的加载图
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