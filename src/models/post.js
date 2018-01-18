import Gitalk from 'gitalk'
import { queryPost, queryPostHot } from '../services/fetch'
import { delay } from '../utils'
import config from '../config'

const { gitalkOptions } = config

export default {
  namespace: 'post',
  state: {
    loading: true,
    post: {},
    time: 1,
    showReward: false,
  },
  reducers: {
    queryStart(state, { payload }) {
      return { ...state, loading: true }
    },

    queryEnd(state, { payload }) {
      return { ...state, ...payload, loading: false }
    },

    setComments(state, { payload }) {
      return { ...state, ...payload }
    },

    update(state, { payload }) {
      return { ...state, ...payload }
    },

    reset(state, { payload }) {
      return { ...state, loading: true, post: {}, comment: [] }
    },
  },
  effects: {
    *queryPost({ payload }, { call, put }) {
      yield put({ type: 'queryStart' })
      const post = yield call(queryPost, payload)
      yield call(delay, 500)

      const { title } = post

      // 渲染评论
      const gitalk = new Gitalk({
        ...gitalkOptions,
        title,
      })
      gitalk.render('gitalk')

      yield put({ type: 'queryEnd', payload: { post } })
      const time = yield call(queryPostHot, { post })
      yield put({ type: 'update', payload: { time } })
    },
  },
}
