import Gitalk from 'gitalk'
import { queryTotal, queryPost, queryPostHot } from '../services/fetch'
import { delay } from '../utils'
import config from '../config'

const { minDelay, gitalkOptions } = config

export default {
  namespace: 'post',
  state: {
    post: {},
    prevPost: {},
    nextPost: {},
    rewardStatu: 0,
  },
  reducers: {
    queryStart(state, { payload }) {
      return { ...state, post: {}, rewardStatu: 0 }
    },

    queryEnd(state, { payload }) {
      return { ...state, ...payload }
    },

    setComments(state, { payload }) {
      return { ...state, ...payload }
    },

    update(state, { payload }) {
      return { ...state, ...payload }
    },

    reset(state, { payload }) {
      return { ...state, post: {}, prevPost: {}, nextPost: {}, showReward: false }
    },
  },
  effects: {
    *queryPost({ payload }, { select, call, put }) {
      const startTime = new Date()
      yield put({ type: 'queryStart' })
      const post = yield call(queryPost, payload)
      const { title, id } = post
      // 前篇和后篇
      let totalList = yield select(state => state.page.totalList)
      if (!totalList.length) {
        totalList = yield call(queryTotal, payload)
      }
      const inx = totalList.findIndex(o => o.id === id)
      const prevPost = totalList[inx-1] || totalList[totalList.length - 1]
      const nextPost = totalList[inx+1] || totalList[0]
      // 阅读次数
      const time = yield call(queryPostHot, { post })
      const prevTime = yield call(queryPostHot, { post: prevPost })
      const nextTime = yield call(queryPostHot, { post: nextPost })
      // 渲染评论
      const gitalk = new Gitalk({
        ...gitalkOptions,
        title,
      })
      gitalk.render('gitalk')
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) yield call(delay, minDelay - delayTime)
      yield put({ type: 'queryEnd', payload: { 
        post: { ...post, time }, 
        prevPost: { ...prevPost, time: prevTime }, 
        nextPost: { ...nextPost, time: nextTime },
      } })
    },
  },
}
