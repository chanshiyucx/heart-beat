import { queryTotal, queryList, queryHot } from '../services/fetch'
import { delay } from '../utils'
import config from '../config'

const { minDelay } = config

export default {
  namespace: 'home',
  state: {
    onHide: true,
    loading: true,
    hasMore: true,
    total: 0, // 文章总数
    postList: [], // 文章列表
    page: 1,
    pageSize: 4,
    times: [],
  },
  reducers: {
    queryStart(state, { payload }) {
      return { ...state, loading: true }
    },

    queryEnd(state, { payload }) {
      return { ...state, ...payload, loading: false, onHide: false }
    },

    setPostList(state, { payload }) {
      return { ...state, ...payload }
    },

    update(state, { payload }) {
      return { ...state, ...payload }
    },

    reset(state, { payload }) {
      return { ...state, loading: true, onHide: true, times: [] }
    },
  },
  effects: {
    *queryTotal({ payload }, { call, put }) {
      const total = yield call(queryTotal, payload)
      yield put({ type: 'update', payload: { total } })
      yield put({ type: 'queryList' })
    },

    *queryList({ payload }, { select, call, put }) {
      yield put({ type: 'queryStart' })
      const startTime = new Date()
      const data = yield select(state => state.home)
      const { total, page, pageSize } = data
      const maxPage = Math.ceil(total / pageSize)
      const queryType = payload ? payload.queryType : ''
      let queryPage
      if (queryType === 'prev') {
        queryPage = page - 1 <= 0 ? maxPage : page - 1
      } else if (queryType === 'next') {
        queryPage = page + 1 > maxPage ? 1 : page + 1
      } else {
        queryPage = page
      }
      const postList = yield call(queryList, { page: queryPage, pageSize })
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'queryEnd', payload: { postList, page: queryPage } })
      const times = yield call(queryHot, { postList })
      yield put({ type: 'update', payload: { times } })
    },
  },
}
