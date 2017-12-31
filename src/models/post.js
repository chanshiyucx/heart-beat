import Gitalk from 'gitalk'
import { queryPost, queryComments, queryPostHot } from '../services/fetch'
import { delay } from '../utils'

export default {
  namespace: 'post',
  state: {
    loading: true,
    post: {},
    comments: [],
    time: 1,
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
      const gitalk = new Gitalk({
        clientID: '655fdc97b211a9f4f4a9',
        clientSecret: '77867cd14723002397338fcb76d139b13bdec439',
        repo: 'BlogComments',
        owner: 'chanshiyucx',
        admin: ['chanshiyucx'],
        // facebook-like distraction free mode
        distractionFreeMode: false,
        title,
      })
      // 渲染评论
      gitalk.render('gitalk')

      yield put({ type: 'queryEnd', payload: { post } })
      const time = yield call(queryPostHot, { post })
      yield put({ type: 'update', payload: { time } })
    },

    *queryComments({ payload }, { call, put }) {
      const comments = yield call(queryComments, payload)
      yield put({ type: 'setComments', payload: comments })
    },
  },
}
