import { queryTotal, queryHot } from '../services/fetch'
import { delay } from '../utils'
import config from '../config'

const { minDelay } = config

export default {
  namespace: 'home',
  state: {
    loading: true,
    onHide: true,
    totalList: [],
    postList: [],
    times: [],
  },
  reducers: {
    queryEnd(state, { payload }) {
      return { ...state, ...payload }
    },

    setPostList(state, { payload }) {
      return { ...state, ...payload }
    },

    update(state, { payload }) {
      return { ...state, ...payload }
    },

    reset(state, { payload }) {
      return { ...state, postList: [], loading: true, onHide: true, times: [] }
    },
  },
  effects: {
    *queryTotal({ payload }, { call, put }) {
      yield put({ type: 'update', payload: { loading: true } })
      // 一次获取全部，目前没有好的方法优化翻页对称性，数据量也不大
      const totalList = yield call(queryTotal, payload)
      yield put({ type: 'update', payload: { totalList } })
      yield put({ type: 'queryList' })
    },

    *queryList({ payload }, { select, call, put }) {
      yield put({ type: 'update', payload: { loading: true } })
      const startTime = new Date()
      const data = yield select(state => state.home)
      const { totalList, postList } = data
      const queryType = payload ? payload.queryType : ''
      const length = totalList.length
      let newPostList = []
      // 由于使用文章补全对称，所以页码是动态的，不用考虑页码
      // 直接根据当前文章的角标来截取
      if (queryType === 'prev') {
        const endInx = totalList.findIndex(o => o.id === postList[0].id)
        // 直接填充
        for (let i = 1; i < 5; i++) {
          const addInx = endInx - i < 0 ? length - i : endInx - i
          newPostList.unshift(totalList[addInx])
        }
      } else if (queryType === 'next') {
        const startInx = totalList.findIndex(o => o.id === postList[3].id)
        const list = totalList.slice(startInx + 1, startInx + 5)
        if (list.length < 4) {
          const addList = totalList.slice(0, 4 - list.length)
          newPostList = list.concat(addList)
        } else {
          newPostList = list
        }
      } else {
        newPostList = totalList.slice(0, 4)
      }
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'queryEnd', payload: { postList: newPostList, onHide: false } })
      const times = yield call(queryHot, { postList: newPostList })
      yield put({ type: 'update', payload: { times, loading: false } })
    },
  },
}
