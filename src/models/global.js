import router from 'umi/router'
import _ from 'lodash'

import {
  queryTotal,
  queryHot,
  queryPostHot,
  queryCats,
  queryTags,
  queryFilterPost,
  queryMoodTotal,
  queryPage,
  likeSite
} from '../services'
import { delay, formatPost, loadImg } from '../utils'

const minDelay = 1000
let lastTipsUpdateAt

export default {
  namespace: 'app',
  state: {
    totalList: [], // 所有文章列表
    postList: [], // 当前文章列表
    post: {}, // 当前文章内容
    prevPost: {}, // 前篇文章
    nextPost: {}, // 后篇文章

    cats: [], // 分类
    tags: [], // 标签
    mood: [], // 心情

    about: {}, // 关于
    books: {}, // 书单
    friends: {}, // 友链

    tips: '', // live2d 聊天
    lastTipsUpdateAt: '', // 最后一次更新 tips

    isLikeSite: false, // 是否已点赞
    likeTimes: 0 // 点赞次数
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    // 所有文章
    *queryTotal({ payload }, { call, put }) {
      const totalList = yield call(queryTotal, payload)
      const length = totalList.length
      _.forEach(totalList, (post, index) => formatPost(post, index, length))
      yield put({ type: 'updateState', payload: { totalList } })
    },

    // 首页文章
    *queryList({ payload }, { select, take, call, put }) {
      const startTime = new Date()
      const state = yield select(state => state.app)
      let { totalList, postList } = state
      // 文章列表不存在先获取文章
      if (!totalList.length) {
        yield put({ type: 'queryTotal' })
        yield take('queryTotal/@@end')
        totalList = yield select(state => state.app.totalList)
      }
      const { queryType } = payload
      const length = totalList.length
      let nextPostList = []
      // 直接根据当前文章的角标来截取
      if (postList.length) {
        if (queryType === 'prev') {
          const endInx = totalList.findIndex(o => o.id === postList[0].id)
          for (let i = 1; i < 5; i++) {
            const addInx = endInx - i < 0 ? length + endInx - i : endInx - i
            nextPostList.unshift(totalList[addInx])
          }
        } else if (queryType === 'next') {
          const startInx = totalList.findIndex(o => o.id === postList[3].id)
          for (let i = 1; i < 5; i++) {
            const addInx = startInx + i < length ? startInx + i : startInx + i - length
            nextPostList.push(totalList[addInx])
          }
        } else if (queryType === 'add') {
          const endInx = totalList.findIndex(o => o.id === postList[postList.length - 1].id)
          for (let i = 1; i < 5; i++) {
            const addInx = endInx + i
            if (addInx >= totalList.length) continue
            nextPostList.push(totalList[addInx])
          }
          nextPostList = postList.concat(nextPostList)
        } else {
          nextPostList = postList
        }
      } else {
        nextPostList = totalList.slice(0, 4)
      }
      nextPostList = yield call(queryHot, { postList: nextPostList }) // 获取热度
      const images = _.map(nextPostList, post => post.cover.src)
      yield call(loadImg, { images }) // 加载预览图
      const delayTime = new Date() - startTime
      if (delayTime < minDelay && queryType !== 'add') {
        yield call(delay, minDelay - delayTime)
      }
      yield put({ type: 'updateState', payload: { postList: nextPostList } })
    },

    // 文章内容
    *queryPost({ payload }, { select, take, call, put }) {
      const startTime = new Date()
      let totalList = yield select(state => state.app.totalList)
      // 文章列表不存在先获取文章
      if (!totalList.length) {
        yield put({ type: 'queryTotal' })
        yield take('queryTotal/@@end')
        totalList = yield select(state => state.app.totalList)
      }
      const index = totalList.findIndex(post => post.number === parseInt(payload.number, 10))
      // 若文章不存在则跳转首页
      if (!totalList[index]) {
        router.push('/')
        return
      }
      // 前篇和后篇
      let post = totalList[index]
      const prev = index - 1 > 0 ? index - 1 : totalList.length - 1
      const next = index + 1 < totalList.length ? index + 1 : 0
      let prevPost = totalList[prev]
      let nextPost = totalList[next]
      post = yield call(queryPostHot, { post })
      prevPost = yield call(queryPostHot, { post: prevPost, add: false })
      nextPost = yield call(queryPostHot, { post: nextPost, add: false })
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) {
        yield call(delay, minDelay - delayTime)
      }
      yield put({ type: 'updateState', payload: { post, prevPost, nextPost } })
    },

    // 归档文章
    *queryArchives({}, { select, take, call, put }) {
      const startTime = new Date()
      const state = yield select(state => state.app)
      let { totalList } = state
      if (!totalList.length) {
        yield put({ type: 'queryTotal' })
        yield take('queryTotal/@@end')
        totalList = yield select(state => state.app.totalList)
      }
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) {
        yield call(delay, minDelay - delayTime)
      }
      return totalList
    },

    // 分类列表
    *queryCats({ payload }, { call, put }) {
      const startTime = new Date()
      const cats = yield call(queryCats, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) {
        yield call(delay, minDelay - delayTime)
      }
      yield put({ type: 'updateState', payload: { cats } })
    },

    // 标签列表
    *queryTags({ payload }, { call, put }) {
      const startTime = new Date()
      const tags = yield call(queryTags, payload)
      // 筛选 tags 【Friends, Books, About, Mood】
      const filterTags = tags.filter(o => {
        const { name } = o
        return !(name === 'Friends' || name === 'Books' || name === 'About' || name === 'Mood')
      })
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) {
        yield call(delay, minDelay - delayTime)
      }
      yield put({ type: 'updateState', payload: { tags: filterTags } })
    },

    // 根据分类和标签筛选文章
    *filterPost({ payload }, { call }) {
      const filterPost = yield call(queryFilterPost, payload)
      return filterPost
    },

    // 说说列表
    *queryMoodTotal({ payload }, { call, put }) {
      const mood = yield call(queryMoodTotal, payload)
      yield put({ type: 'updateState', payload: { mood } })
    },

    // 当前说说
    *queryMood({}, { select, take, call, put }) {
      const startTime = new Date()
      const state = yield select(state => state.app)
      let { mood } = state
      // 说说列表不存在先获取说说
      if (!mood.length) {
        yield put({ type: 'queryMoodTotal' })
        yield take('queryMoodTotal/@@end')
        mood = yield select(state => state.app.mood)
      }
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) {
        yield call(delay, minDelay - delayTime)
      }
      return mood
    },

    // 书单/友链/关于
    *queryPage({ payload }, { call, put }) {
      const startTime = new Date()
      const { type } = payload
      const data = yield call(queryPage, payload)
      const delayTime = new Date() - startTime
      if (delayTime < minDelay) {
        yield call(delay, minDelay - delayTime)
      }
      yield put({ type: 'updateState', payload: { [type]: data } })
    },

    // 看板娘文字
    *showTips({ payload }, { select, call, put }) {
      lastTipsUpdateAt = new Date()
      yield put({ type: 'updateState', payload: { tips: payload.tips } })
      yield call(delay, 6000)
      // 6s 内未再更新则隐藏
      if (new Date() - lastTipsUpdateAt > 6000) {
        yield put({
          type: 'updateState',
          payload: { tips: '', lastTipsUpdateAt: new Date() }
        })
      }
    },

    // 加载缓存
    *loadStorage({ payload }, { call, put }) {
      const isLikeSite = window.localStorage.getItem('isLikeSite', true)
      const likeTimes = yield call(likeSite, { type: 'getTime' })
      yield put({ type: 'updateState', payload: { isLikeSite, likeTimes } })
    },

    // 喜欢小站
    *likeSite({ payload }, { call, put }) {
      const likeTimes = yield call(likeSite)
      window.localStorage.setItem('isLikeSite', true)
      yield put({
        type: 'updateState',
        payload: { likeTimes, isLikeSite: true }
      })
    }
  },

  // 启动
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' }) // 加载本地缓存
    }
  }
}
