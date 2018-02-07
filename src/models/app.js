import { likeSite } from '../services/fetch'
import { delay } from '../utils'

export default {
  namespace: 'appModel',
  state: {
    currCover: 4,
    hideCover: false,
    coverOnHide: false,
    dropMenu: false,
    showTop: false,
    showPlayer: false,
    isPlaying: false,
    showWaifu: true,
    waifu: 'tia',
    updatedAt: '',
    tips: '',
    lightbulb: false,
    likeTime: 0,
    likeChanshiyu: false,
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *loadStorage({ payload }, { call, put }) {
      const likeChanshiyu = window.localStorage.getItem('likeChanshiyu', true)
      const likeTime = yield call(likeSite, { type: 'getTime' })
      yield put({ type: 'update', payload: { likeChanshiyu, likeTime } })
    },

    *showTips({ payload }, { select, call, put }) {
      yield put({
        type: 'update',
        payload: { ...payload, updatedAt: Date.now() },
      })
      yield call(delay, 8000)
      const updatedAt = yield select(state => state.appModel.updatedAt)
      const duration = Date.now() - updatedAt
      if (duration >= 8000) {
        yield put({ type: 'update', payload: { tips: '' } })
      }
    },

    *hiddenWaifu({ payload }, { call, put }) {
      yield put({
        type: 'update',
        payload: { ...payload, updatedAt: Date.now() },
      })
      yield call(delay, 2000)
      yield put({ type: 'update', payload: { showWaifu: false } })
    },

    *likeSite({ payload }, { call, put }) {
      const likeTime = yield call(likeSite, payload)
      window.localStorage.setItem('likeChanshiyu', true)
      yield put({ type: 'update', payload: { likeTime, likeChanshiyu: true } })
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
