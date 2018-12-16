import classNames from 'classnames/bind'
import styles from './index.less'

const cx = classNames.bind(styles)

const Pagination = ({ page, maxPage, prev, next }) => {
  return (
    <div class={cx('pagination')}>
      <button disabled={page <= 1} class={cx('prevBtn')} onClick={prev}>
        前一页
      </button>
      <span>{page}</span>
      <button disabled={page >= maxPage} class={cx('nextBtn')} onClick={next}>
        后一页
      </button>
    </div>
  )
}

export default Pagination
