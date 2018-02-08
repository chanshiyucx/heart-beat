import {
  queryTotal,
  queryCats,
  queryTags,
  filterList,
  queryShuoShuoTotal,
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
    totalList: [],
    archives: [],
    page: 0,
    // 分类 & 标签
    catsOnHide: true,
    tagsOnHide: true,
    cats: [],
    tags: [],
    filterTitle: '',
    filterPost: [],
    // 说说
    shuoshuoOnHide: true,
    shuoshuoTotal: [],
    myShuoShuo: [],
    shuoshuoPage: 0,
    // 书单 && 友链 && 关于
    books: {},
    friends: {},
    about: {},
  },
  reducers: {
    queryEnd(state, { payload }) {
      return { ...state, ...payload }
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
      const totalList = yield call(queryTotal, payload)
      yield put({ type: 'update', payload: { totalList } })
      yield put({ type: 'queryArchives' })
    },

    *queryArchives({ payload }, { select, call, put }) {
      const startTime = new Date()
      const data = yield select(state => state.page)
      const { totalList, page } = data
      const queryType = payload ? payload.queryType : ''
      const queryPage = queryType === 'prev' ? page - 1 : page + 1
      const archives = totalList.slice((queryPage - 1) * 10, queryPage * 10)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({
        type: 'queryEnd',
        payload: {
          archives,
          page: queryPage,
          archivesOnHide: false,
        },
      })
    },

    *queryCats({ payload }, { call, put }) {
      const startTime = new Date()
      const cats = yield call(queryCats, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'queryEnd', payload: { cats, catsOnHide: false } })
    },

    *queryTags({ payload }, { call, put }) {
      const startTime = new Date()
      const tags = yield call(queryTags, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'queryEnd', payload: { tags, tagsOnHide: false } })
    },

    *queryShuoShuoTotal({ payload }, { call, put }) {
      const shuoshuoTotal = yield call(queryShuoShuoTotal, payload)
      yield put({ type: 'update', payload: { shuoshuoTotal } })
      yield put({ type: 'queryShuoShuo' })
    },

    *queryShuoShuo({ payload }, { select, call, put }) {
      const startTime = new Date()
      const data = yield select(state => state.page)
      const { shuoshuoTotal ,shuoshuoPage } = data
      const queryType = payload ? payload.queryType : ''
      const queryPage = queryType === 'prev' ? shuoshuoPage - 1 : shuoshuoPage + 1
      const myShuoShuo = shuoshuoTotal.slice((queryPage - 1) * 6, queryPage * 6)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({
        type: 'queryEnd',
        payload: {
          myShuoShuo,
          shuoshuoPage: queryPage,
          shuoshuoOnHide: false,
        },
      })
    },

    *queryPage({ payload }, { call, put }) {
      const startTime = new Date()
      const { type } = payload
      const data = yield call(queryPage, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'queryEnd', payload: { [type]: data } })
    },

    *filterPost({ payload }, { call, put }) {
      const startTime = new Date()
      const { filterTitle } = payload
      const filterPost = yield call(filterList, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      // 需要根据当前页置为 false
      const { type } = payload
      const onHide = type === 'labels' ? { tagsOnHide: false } : { catsOnHide: false }
      yield put({ type: 'queryEnd', payload: { filterPost, filterTitle, ...onHide } })
    },
  },
}
