import { queryTotal, queryList, queryCats, queryTags } from '../services/fetch'
import { delay } from '../utils'

const minDelay = 1000

export default {
  namespace: 'site',
  state: {
    loading: true,
    hasMore: true,
    total: 0,
    page: 0,
    pageSize: 4,
    archives: [],
    cats: [],
    tags: [],
    showFriends: false,
    showAbout: false,
  },
  reducers: {
    queryStart(state, { payload }) {
      return { ...state, loading: true }
    },

    queryEnd(state, { payload }) {
      return { ...state, ...payload, loading: false }
    },

    update(state, { payload }) {
      return { ...state, ...payload }
    },

    reset(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *queryTotal({ payload }, { call, put }) {
      const total = yield call(queryTotal, payload)
      yield put({ type: 'update', payload: { total } })
      yield put({ type: 'queryMore' })
    },

    *queryMore({ payload }, { select, call, put }) {
      yield put({ type: 'queryStart' })
      const startTime = new Date()
      const data = yield select(state => state.site)
      const { total, archives, page, pageSize } = data
      const queryPage = page + 1
      const list = yield call(queryList, { page: queryPage, pageSize })
      archives.concat(newArchives)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      const newArchives = archives.concat(list)
      yield put({ type: 'queryEnd', payload: { archives: newArchives, page: queryPage, hasMore: newArchives.length < total }})
    },

    *queryCats({ payload }, { call, put }) {
      const startTime = new Date()
      const cats = yield call(queryCats, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'update', payload: { cats }})
    },

    *queryTags({ payload }, { call, put }) {
      const startTime = new Date()
      const tags = yield call(queryTags, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'update', payload: { tags }})
    },

    *showFriends({ payload }, { call, put }) {
      yield call(delay, minDelay)
      yield put({ type: 'update', payload: { showFriends: true }})
    },

    *showAbout({ payload }, { call, put }) {
      yield call(delay, minDelay)
      yield put({ type: 'update', payload: { showAbout: true }})
    },
  },
}
