import {
  queryTotal,
  queryList,
  queryCats,
  queryTags,
  filterList,
  queryShuoShuoTotal,
  queryShuoShuo,
  queryPage,
} from '../services/fetch'
import { delay } from '../utils'
import config from '../config'

const { minDelay } = config

export default {
  namespace: 'page',
  state: {
    // 归档
    archivesOnHide: true,
    loading: true,
    total: 0,
    page: 0,
    pageSize: 10,
    archives: [],
    // 分类 & 标签
    cats: [],
    tags: [],
    catsOnHide: true,
    tagsOnHide: true,
    filterTitle: '',
    filterPost: [],
    // 说说
    shuoshuoOnHide: true,
    shuoshuoLoading: true,
    myShuoShuo: [],
    shuoshuoTotal: 0,
    shuoshuoPage: 0,
    shuoshuoPageSize: 6,
    // 书单 && 友链 && 关于
    books: {},
    friends: {},
    about: {},
  },
  reducers: {
    queryStart(state, { payload }) {
      return { ...state, loading: true }
    },

    queryEnd(state, { payload }) {
      return { ...state, ...payload, loading: false, archivesOnHide: false }
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
      yield put({ type: 'queryArchives' })
    },

    *queryArchives({ payload }, { select, call, put }) {
      yield put({ type: 'queryStart' })
      const startTime = new Date()
      const data = yield select(state => state.page)
      const { page, pageSize } = data
      const queryType = payload ? payload.queryType : ''
      const queryPage = queryType === 'prev' ? page - 1 : page + 1
      const archives = yield call(queryList, { page: queryPage, pageSize })
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({
        type: 'queryEnd',
        payload: {
          archives,
          page: queryPage,
          archivesOnHide: false,
          loading: false,
        },
      })
    },

    *queryCats({ payload }, { call, put }) {
      const startTime = new Date()
      const cats = yield call(queryCats, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'update', payload: { cats, catsOnHide: false } })
    },

    *queryTags({ payload }, { call, put }) {
      const startTime = new Date()
      const tags = yield call(queryTags, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'update', payload: { tags, tagsOnHide: false } })
    },

    *queryShuoShuoTotal({ payload }, { call, put }) {
      const shuoshuoTotal = yield call(queryShuoShuoTotal, payload)
      yield put({ type: 'update', payload: { shuoshuoTotal } })
      yield put({ type: 'queryShuoShuo' })
    },

    *queryShuoShuo({ payload }, { select, call, put }) {
      yield put({ type: 'update', payload: { shuoshuoLoading: true } })
      const startTime = new Date()
      const data = yield select(state => state.page)
      const { shuoshuoPage, shuoshuoPageSize } = data
      const queryType = payload ? payload.queryType : ''
      const queryPage = queryType === 'prev' ? shuoshuoPage - 1 : shuoshuoPage + 1
      const myShuoShuo = yield call(queryShuoShuo, {
        page: queryPage,
        pageSize: shuoshuoPageSize,
      })
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({
        type: 'update',
        payload: {
          myShuoShuo,
          shuoshuoPage: queryPage,
          shuoshuoOnHide: false,
          shuoshuoLoading: false,
        },
      })
    },

    *queryPage({ payload }, { call, put }) {
      const startTime = new Date()
      const { type } = payload
      const data = yield call(queryPage, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'update', payload: { [type]: data } })
    },

    *filterPost({ payload }, { call, put }) {
      const startTime = new Date()
      const { filterTitle } = payload
      const filterPost = yield call(filterList, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'update', payload: { filterPost, filterTitle, catsOnHide: false, tagsOnHide: false } })
    },
  },
}
